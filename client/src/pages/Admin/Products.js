import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [Products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"all products list"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {Products?.map((p) => (
              <Link
                key={p._id}
                to={`/deshboard/admin/products/${p.slug}`}
                className="product-link"
              >
                <div className="card m-3" style={{ width: "12rem" }}>
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.Name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{`Price : ₹ ${p.Price} INR`}</h5>
                    <h5 className="card-title">{`Name : ${p.Name}`}</h5>
                    <h5 className="card-title">{`Brand name : ${p.Brand}`}</h5>
                    <p className="card-text">{p.Description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
