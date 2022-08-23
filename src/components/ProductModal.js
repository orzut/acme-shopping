import React from "react";
import { connect } from "react-redux";
import "../ProductModal.css";

class ProductModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>test</h1>
      </div>
    );
  }
}

export default connect((state) => state)(ProductModal);
