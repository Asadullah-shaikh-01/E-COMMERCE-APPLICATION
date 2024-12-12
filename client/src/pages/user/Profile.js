import React, { useState,useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import toast from 'react-hot-toast';
import axios from "axios";

const Profile = () => {
  // context
const {auth,setAuth}=useAuth();
  //state
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");

  //get user data
  useEffect(() => {
    const { Email, Name, Phone, Address } = auth?.user;
    setName(Name);
    setPhone(Phone);
    setEmail(Email);
    setAddress(Address);
  }, [auth?.user]);
  
  // form functions
    const handleSubmit = async (e) => {
      e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile", {
        Name,
        Email,
        Phone,
        Address,
        Password
  
      });
      if (data?.error) {
        toast.error(data?.error)
      } else {
        setAuth({...auth,user:data?.updatedUser});
        let ls =localStorage.getItem("auth");
        ls=JSON.parse(ls);
        ls.user=data.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("Profile Update successfuly");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={'your Profile'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
          <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className="title"> User Profile</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your Full name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Exmple@gmail.com"
              required
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone
            </label>
            <input
              type="text"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter you currnte Number "
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Home Address"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
