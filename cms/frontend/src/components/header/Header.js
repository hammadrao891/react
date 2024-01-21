import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const logout = async () => {
    // navigate("/login");
    // localStorage.removeItem("user")
    // window.location.reload("/")
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Air Foundation School System Chakwal </span>
          {/* <span className="--color-danger">{name}</span> */}
        </h3>
        {/* <button onClick={logout} className="--btn --btn-danger">
          Logout
        </button> */}
      </div>
      <hr />
    </div>
  );
};

export default Header;
