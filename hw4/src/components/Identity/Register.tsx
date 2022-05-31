import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegisterRequest } from "../../domain/IRegisterRequest";
import IdentityService from "../../services/IdentityService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    let registerInfo: IRegisterRequest = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      roles: ["restaurant"],
    };
    let response = await IdentityService.register(registerInfo);

    if (passwordConfirm !== password) {
      setErrorMsg("Check entered data");
      return;
    }

    if (response.status === 200) {
      navigate("/home");
      window.location.reload();
      return;
    }
    setErrorMsg("Check entered data");
  };

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage:
          "url(https://d2skenm2jauoc1.cloudfront.net/brand/login_background.png)",
        minHeight: window.innerHeight,
      }}
    >
      <div
        className="container h-100"
        style={{ minHeight: window.innerHeight }}
      >
        <div
          className="row align-items-center h-100"
          style={{ minHeight: window.innerHeight }}
        >
          <div className="col-6 mx-auto">
            <div className="container card h-100 justify-content-center">
              <h1 className="mt-5">Register</h1>
              {errorMsg != "" && (
                <div className="alert alert-danger">{errorMsg}</div>
              )}
              <div className="form-group">
                <label className="col-form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <p className="mb-0">Have an account?</p>
                <a href="/" className="text-black-50 fw-bold">
                  Log in
                </a>
              </div>
              <div className="form-group mt-2 mb-4">
                <button className="btn btn-secondary" onClick={handleRegister}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
