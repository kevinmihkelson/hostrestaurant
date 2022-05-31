import { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import IdentityService from "../services/IdentityService";

const Homepage = (props: { fetchData: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    var res = await IdentityService.login(email, password);
    if (res.status === 200) {
      await props.fetchData();
      navigate("/home");
      return;
    }
    setErrorMsg("Check entered data!");
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
              <h3 className="mt-3">Login</h3>
              {errorMsg != "" && (
                <div className="alert alert-danger">{errorMsg}</div>
              )}
              <div className="form-group">
                <label className="col-form-label">Email</label>
                <input
                  type="text"
                  placeholder="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <p className="mb-0">Don't have an account?</p>
                <a
                  href="/identity/account/register"
                  className="text-black-50 fw-bold"
                >
                  Sign Up
                </a>
              </div>
              <div className="mt-2 mb-4">
                <button
                  className="btn btn-secondary"
                  type="submit"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
