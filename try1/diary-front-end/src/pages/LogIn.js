import React from "react";
import LoginComponent from "../components/LoginComponent";

const Signin = () => {
  return (
    <>
      <h2 className="text-center pt-4 pb-4">Login</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <LoginComponent />
        </div>
      </div>
    </>
  );
};

export default Signin;
