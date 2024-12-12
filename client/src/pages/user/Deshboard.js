import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";

const Deshboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"User Deshboard- E-commerc App"}>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu/>
        </div>
        <div className='col-md-9'>
          <div className='card w-55 p-3'>
          <h5>Name:{auth?.user?.Name}</h5>
            <h5>Email Id:{auth?.user?.Email}</h5>
            <h5>Phone: {auth?.user?.Phone}</h5>
            <h5>Adress: {auth?.user?.Address}</h5>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Deshboard;
