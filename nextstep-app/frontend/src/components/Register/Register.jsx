import React from "react";
import "./Register.css";
import RegistrationLeft from "./register-component/RegisterLeft";
import RegistrationRight from "./register-component/RegisterRight";

const StudentRegistration = () => {
  return (
    <div className="registration-page">
      <RegistrationLeft />
      <RegistrationRight />
    </div>
  );
};

export default StudentRegistration;
