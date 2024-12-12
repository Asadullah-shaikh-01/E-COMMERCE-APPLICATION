import React from "react";
import { NavLink } from "react-router-dom";
import Deshboard from './../../pages/user/Deshboard';

const UserMenu = () => {
  return (
    <>
    <div className="text-center">
      <div className="list-group">
        <h4>Deshboard</h4>

        <NavLink
          to="/deshboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/deshboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
    
      </div>
    </div>
  </>
  )
}

export default UserMenu