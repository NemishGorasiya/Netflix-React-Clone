import { useState } from "react";
import CustomInput from "../UI/CustomInput";
import "./AuthForm.scss";
const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const updateEmail = (val) => {
    setEmail(val);
  };
  const updatePassword = (val) => {
    setPassword(val);
  };
  const validateEmail = (val) => {
    if (val.length <= 6) {
      return false;
    } else {
      return true;
    }
  };
  const validatePassword = (val) => {
    if (val.length <= 10) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="authenticationFormContainer">
      <form action="" className="authenticationForm">
        <CustomInput
          updateState={updateEmail}
          errorMessage="invalid email"
          floatingLabel="Enter email"
          required={true}
          id="email"
          type="email"
          inputValidationFn={validateEmail}
        />
        <CustomInput
          updateState={updateEmail}
          errorMessage="invalid email"
          floatingLabel="Enter email"
          required={true}
          id="email"
          type="email"
          inputValidationFn={validateEmail}
        />
        <CustomInput
          updateState={updatePassword}
          errorMessage="invalid Password"
          floatingLabel="Enter Password"
          required={true}
          id="password"
          type="password"
          inputValidationFn={validatePassword}
        />
      </form>
    </div>
  );
};

export default AuthForm;
