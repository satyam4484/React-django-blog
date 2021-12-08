import { Fragment, useState, useContext } from "react";
import Messages from "../../Components/UI/Messages";
import AuthContext from "../../store/auth-request";
import { useNavigate } from "react-router";
import shopping from "../../bg.jpg";
import useRequest from "../../hooks/Requests";

const st = {
  boderRadius: "55px",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passtype, setPasstype] = useState("password");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const request = useRequest();
  const auth = useContext(AuthContext);

  const seePasswordHandler = () => {
    if (passtype === "text") {
      setPasstype("password");
    } else {
      setPasstype("text");
    }
  };
  const onResponse = (response) => {
    if (response.detail) {
      setError("danger");
      setErrorMessage(response.detail);

      setTimeout(() => {
        setError("");
        setErrorMessage("");
      }, 2000);
      return;
    } else {
      const successHandler = (userdata) => {
        if (userdata.error) {
          return;
        } else {
          auth.onLogin(response.access, userdata.data);
        }
      };

      request.sendRequest(
        {
          url: "user/",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.access}`,
          },
        },
        successHandler,
        (error) => console.log(error)
      );
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    request.sendRequest(
      {
        url: "token/",
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
      onResponse,
      (error) => console.log(error)
    );
  };
  return (
    <Fragment>
      {error && <Messages error={error} message={errorMessage} />}
      <div className="container mt-5 bg-grey">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={st}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <h1 className="text-center fw-bold fs-3">Welcome to Blog </h1>
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className=" fs-3 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-warning">
                      Login Form
                    </p>
                    <form
                      className="mx-1 mx-md-4"
                      method="post"
                      onSubmit={submitFormHandler}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa fa-key me-3 fs-4"></i>
                        <div className="form-outline flex-fill ">
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa fa-key me-3 fs-4"></i>
                        <div className="form-outline flex-fill ">
                          <input
                            type={passtype}
                            className={`form-control`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                          />
                        </div>
                      </div>
                      <div class="form-check form-switch text-info mb-2 fw-bold">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          onClick={seePasswordHandler}
                          value=""
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          see Password
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mb-3 mb-lg-4">
                        <Fragment>
                          <button className="btn btn-success btn-lg w-100 mx-2">
                            Login
                          </button>
                          <button
                            className="btn btn-secondary btn-lg w-100 mx-2"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/Signup");
                            }}
                          >
                            Register
                          </button>
                        </Fragment>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={shopping}
                      className="img-fluid w-100"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
