import React from "react";
import { connect } from "react-redux";
import "./CartModal.css";
import Cart from "./Cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { closeCartModal } from "./store";

class CartModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { closeCartModal, cart } = this.props;
    return (
      <div id="cartModal">
        <div className="modalBackground" onClick={() => closeCartModal()} />
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">GRACE SHOPPER CART</h2>
            </div>
            <div className="modal-body">
              {cart.lineItems.map((lineItem) => {
                return (
                  <div key={lineItem.id} className="lineItem">
                    <img src={lineItem.product.image} />
                    <div>
                      <h3>{lineItem.product.name}</h3>
                      <div className="lineItemQuantity">
                        <RemoveIcon />
                        <p>{lineItem.quantity}</p>
                        <AddIcon />
                      </div>
                    </div>
                    <h3>{lineItem.product.cost}</h3>
                  </div>
                );
              })}
            </div>
            <div className="modal-footer">
              <h2>
                TOTAL: &nbsp;
                {cart.lineItems.reduce((accum, lineItem) => {
                  return accum + lineItem.product.cost * 1;
                }, 0)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    closeCartModal: () => {
      dispatch(closeCartModal());
    },
  };
};

export default connect((state) => state, mapDispatch)(CartModal);
