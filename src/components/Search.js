import React from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom"
import TextField from "@mui/material/TextField";
import ProductList from "./ProductList";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Search = ({ products }) => {

  let query = useQuery();
  let history = useHistory();
  let q = query.get("q") || "";
  
  function onChange(ev) {
      let value = ev.target.value;
      if (value === "") {
          history.replace("/search");
      } else {
          history.replace("/search?q=" + value);
      }
  }
  
  let filteredProducts = products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()));
  
  return <div>
    <TextField name="search term" label="Search Products" size="small"
               onChange={onChange}
               value={q} />
               
    {filteredProducts.length === 0 && q !== "" ? <h1>No Products Found!</h1> : <ProductList products={q === "" ? [] : filteredProducts} />}
  </div>
};

export default connect((state) => state)(Search);
