import React from "react";

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
          <span style={{fontSize:"30px"}}>Air Foundation School System Chakwal </span>
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
