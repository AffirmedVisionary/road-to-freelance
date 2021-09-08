import React from "react";
import RegisterComponent from "../components/RegisterComponent";
const Register = () => {
  return (
    <React.Fragment>
      <h2 className="text-center pt-4 pb-4">Register</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <RegisterComponent />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
