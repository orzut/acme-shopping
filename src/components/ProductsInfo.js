import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../Account.css";
import { createProduct, updateProduct, deleteProduct } from "../store";

class ProductsInfo extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  async save(ev) {
    ev.preventDefault();
  }

  render() {
    const { onChange, save } = this;
    let { products, session, categories, genres } = this.props;
    products = products.slice(0, 50);
    return (
      <div id="account-page">
        <h2>Welcome {session.auth.firstName}</h2>
        <div className="container">
          <nav id="admin-nav">
            <Link to="/account/products-info">Products</Link>
            <Link to="/account/users-info">Users</Link>
          </nav>
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Genre</th>
                <th>Cost</th>
                <th>Inventory</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      {
                        categories.find(
                          (category) => category.id === product.categoryId
                        ).name
                      }
                    </td>
                    <td>
                      {
                        genres.find((genre) => genre.id === product.genreId)
                          .name
                      }
                    </td>
                    <td>${product.cost}</td>
                    <td>{product.inventory}</td>

                    <td>
                      <i className="fa-solid fa-pencil"></i>
                    </td>
                    <td>
                      <i className="fa-regular fa-trash-can"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addProduct: () => dispatch(createProduct()),
    updateProduct: (product) => dispatch(updateProduct(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect((state) => state, mapDispatch)(ProductsInfo);
