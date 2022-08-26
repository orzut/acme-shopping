import { useEffect, useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import styled from "@emotion/styled";
import axios from "axios";
import "../Checkout.css";

const Checkout = ({ cart }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zipCode.value,
      },
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    try {
      const { data: clientSecret } = await axios.post(
        "/api/orders/create-payment-intent",
        {
          amount: 14 * 100,
        }
      );

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(
        clientSecret.clientSecret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: "rgb(118, 118, 118)",
      fontSize: "18px",
      // iconColor: "#fff",
      // "::placeholder": {
      //   color: "#87bbfd",
      // },
    },
    invalid: {
      // iconColor: "#FFC7EE",
      // color: "#FFC7EE",
    },
    complete: {
      // iconColor: "#cbf4c9",
    },
  };

  const cardElementOptions = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  return (
    <div id="checkout">
      <div>
        <div className="cart">
          <h2>Items In Cart</h2>
          <div className="cartItems">
            <div key={"header"} className="lineItem">
              <h3>Item Name</h3>
              <h3>Qty</h3>
              <h3>Total Cost</h3>
            </div>
            {cart.cartData.lineItems.length ? (
              cart.cartData.lineItems
                .sort((a, b) => a.id - b.id)
                .map((lineItem) => {
                  return (
                    <div key={lineItem.productId} className="lineItem">
                      <div>
                        <h4>{lineItem.product.name}</h4>
                        <img src={lineItem.product.image} />
                      </div>

                      <p>{lineItem.quantity}</p>
                      <h4>{`$${(
                        lineItem.quantity * lineItem.product.cost
                      ).toFixed(2)}`}</h4>
                    </div>
                  );
                })
            ) : (
              <h3>Your Cart Is Empty</h3>
            )}
          </div>
          <div className="cartFooter">
            <h2>
              TOTAL: &nbsp;
              {cart.cartData.lineItems.length &&
                `$${cart.cartData.lineItems
                  .reduce((accum, lineItem) => {
                    return accum + lineItem.product.cost * lineItem.quantity;
                  }, 0)
                  .toFixed(2)}`}
            </h2>
          </div>
        </div>
      </div>
      <div className="checkoutForm">
        <form onSubmit={handleFormSubmit}>
          <div className="addressForm">
            <TextField required name="name" label="Name" size="small" />
            <TextField
              required
              name="email"
              label="Email"
              size="small"
              type="email"
            />
          </div>
          <TextField
            className="addressForm"
            required
            name="address"
            label="Street Address"
            size="small"
          />
          <div className="addressForm">
            <TextField
              className="city"
              required
              name="city"
              label="City"
              size="small"
            />
            <TextField
              className="state"
              required
              name="state"
              label="State"
              size="small"
              inputProps={{
                style: { textTransform: "uppercase" },
                maxLength: 2,
                minLength: 2,
              }}
            />
            <TextField
              className="zipCode"
              required
              name="zipCode"
              label="Zip Code"
              size="small"
            />
          </div>

          <CardElement className="cardElement" options={cardElementOptions} />
          <Button
            type="submit"
            variant="contained"
            disabled={
              isProcessing || !stripe || cart.cartData.lineItems.length === 0
            }
            size="large"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default connect((state) => state)(Checkout);
