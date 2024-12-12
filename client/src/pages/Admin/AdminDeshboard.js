import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/Auth';
const AdminDeshboard = () => {
  const [auth] =useAuth();
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu/>
        </div>
        <div className='col-md-9'>
          <div className='card w-55 p-3'>
            <h5>admin Name:{auth?.user?.Name}</h5>
            <h5>admin Email id:{auth?.user?.Email}</h5>
            <h5>admin Phone:{auth?.user?.Phone}</h5>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default AdminDeshboard;