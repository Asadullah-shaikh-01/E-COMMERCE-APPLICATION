import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/Search.js";

const Search = () => {
    const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
    <div className="container">
      <div className="text-center">
        <h1>Search Resuts</h1>
        <h6>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </h6>
        <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "15rem" }}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.Name}
                />
                <div className="card-body">
                  <h5 className="card-title">{`Price : ₹ ${p.Price} INR`}</h5>
                  <h5 className="card-title">{`Product : ${p.Name}`}</h5>
                
                <button class="btn btn-primary ms-1">More Details</button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);
};

export default Search