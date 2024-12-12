import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate,useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [Name, setName] = useState("");
    const [Brand, setBrand] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [Category, setCategory] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [Shipping, setShipping] = useState("");
    const [Photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get Single products
    const getSingleProduct = async () =>{
      try {
        const { data } = await axios.get(
          `/api/v1/products/get-product/${params.slug}`
        );
        setName(data.product.Name);
        setBrand(data.product.Brand);
        setId(data.product._id);
        setDescription(data.product.Description);
        setPrice(data.product.Price);
        setPrice(data.product.Price);
        setQuantity(data.product.Quantity);
        setShipping(data.product.Shipping);
        setCategory(data.product.category._id);
      } catch (error) {
        console.log(error);

      }
    };
    useEffect(() => {
      getSingleProduct();
      //eslint-disable-next-line
    }, []);

  
    //get all Category
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/get-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting catgeory");
      }
    };
  
    useEffect(() => {
      getAllCategory();
    }, []);
  
    //Update product function
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("Name", Name);
        productData.append("Brand", Brand);
        productData.append("Description", Description);
        productData.append("Price", Price);
        productData.append("Quantity", Quantity);
       Photo && productData.append("Photo", Photo);
        productData.append("Category", Category);
        const { data } = axios.put(
          `/api/v1/products/update-product/${id}`,
          productData
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Product Created Successfully");
          navigate("/deshboard/admin/products");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };
      //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/deshboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Update Product"}>
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1>Update Product</h1>
          <div className="m-1 w-70">
            <Select 
              bordered={false}
              placeholder="Select a Category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              value={Category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.Name}
                </Option>
              ))} 
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {Photo ? Photo.Name : "Upload Photo"}
                <input
                  type="file"
                  Name="Photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
            {Photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(Photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/products/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={Name}
                placeholder="write a Product Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={Brand}
                placeholder="write a Brand Name"
                className="form-control"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={Description}
                placeholder="write a Product Description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={Price}
                placeholder="write a Product Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={Quantity}
                placeholder="write a Products Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={Shipping ? "Yes": "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>

  )
}

export default UpdateProduct