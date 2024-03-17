import { useState } from "react";
import CustomInput from "../UI/CustomInput";
import "./AuthForm.scss";
import { Link, useSearchParams } from "react-router-dom";
const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchParamas] = useSearchParams();
  console.log(searchParamas.get("mode"));
  console.log(typeof searchParamas.get("mode"));
  const isLoginPage = searchParamas.get("mode") === "login";

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
      <h1 style={{color : 'white'}}>{`${isLoginPage ? "Login" : "Sign Up"}`} page</h1>
      <form action="" className="authenticationForm">
        {
          !isLoginPage && <>
          <CustomInput
          updateState={updateEmail}
          errorMessage="invalid email"
          floatingLabel="Enter First Name"
          required={true}
          id="email"
          type="email"
          inputValidationFn={validateEmail}
        />
        <CustomInput
          updateState={updateEmail}
          errorMessage="invalid email"
          floatingLabel="Enter Last Name"
          required={true}
          id="email"
          type="email"
          inputValidationFn={validateEmail}
        />
          </>
        }
      
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
        {
          !isLoginPage && <CustomInput
          updateState={updatePassword}
          errorMessage="invalid Password"
          floatingLabel="Confirm Password"
          required={true}
          id="password"
          type="password"
          inputValidationFn={validatePassword}
        />
        }
        <button className="authFormSubmitBtn" type="button">Sign In</button>
      </form>
      <Link to={`/auth?mode=${isLoginPage ? "signup":"login"}`}>move to {isLoginPage ? "signup":"login"}</Link>
    </div>
  );
};

export default AuthForm;
