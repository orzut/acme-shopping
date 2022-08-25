import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../Account.css";
import { createProduct, updateProduct } from "../store";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

class CreateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      inventory: "",
      image: "",
      cost: "",
      categoryId: "",
      genreId: "",
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  async save(ev) {
    ev.preventDefault();
    this.props.addProduct(this.state);
    this.setState({
      name: "",
      inventory: "",
      image: "",
      cost: "",
      categoryId: "",
      genreId: "",
    });
  }

  render() {
    const { session, categories, genres } = this.props;
    const { name, inventory, image, cost, categoryId, genreId } = this.state;
    const { save, onChange } = this;

    return (
      <div id="account-page">
        <h2>Welcome {session.auth.firstName}</h2>
        <div className="container">
          <nav id="admin-nav">
            <Link to="/account/add-product">Create Product</Link>
            <Link to="/account/products-info">Products</Link>
            <Link to="/account/users-info">Users</Link>
          </nav>
          <div>
            <h3>Create a new product</h3>
            <form className="create-product" onSubmit={save}>
              <TextField
                required
                margin="dense"
                type="text"
                name="name"
                label="Name"
                size="small"
                onChange={onChange}
                value={name}
              />
              <FormControl sx={{ mt: 1 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={categoryId}
                  label="Category"
                  onChange={onChange}
                >
                  {categories.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 1 }}>
                <InputLabel>Genre</InputLabel>
                <Select
                  name="genreId"
                  value={genreId}
                  label="Genre"
                  onChange={onChange}
                >
                  {genres.map((genre) => {
                    return (
                      <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                required
                margin="dense"
                type="number"
                name="inventory"
                label="Inventory"
                size="small"
                onChange={onChange}
                value={inventory}
              />
              <TextField
                required
                margin="dense"
                type="number"
                name="cost"
                label="Cost"
                size="small"
                onChange={onChange}
                value={cost}
              />

              <button className="create-btn" type="submit">
                Add product
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    addProduct: (product) => dispatch(createProduct(product, history)),
    updateProduct: (product) => dispatch(updateProduct(product)),
  };
};

export default connect((state) => state, mapDispatch)(CreateProduct);
