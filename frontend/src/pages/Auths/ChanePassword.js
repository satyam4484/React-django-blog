import { useState } from "react";
import useRequest from "../../hooks/Requests";
import shopping from "../../bg.jpg";
import Messages from "../../Components/UI/Messages";
import { useNavigate } from "react-router";
import { Fragment } from "react/cjs/react.production.min";

const st = {
  boderRadius: "55px",
};
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const request = useRequest();
  const wrongPasswordHandler = (response) => {
    if (response.error) {
      setError("danger");
      setErrorMessage(response.msg);

      setTimeout(() => {
        setError("");
        setErrorMessage("");
      }, 2000);
      return;
    } else {
      setError("success");
      setErrorMessage("Password changed successfully !!!");

      setTimeout(() => {
        setError("");
        setErrorMessage("");
        navigate(-1);
      }, 2000);
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    request.sendRequest(
      {
        url: "user/password/",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      },
      wrongPasswordHandler,
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
                      Change Password
                    </p>
                    <form
                      className="mx-1 mx-md-4"
                      method="post"
                      onSubmit={submitFormHandler}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill ">
                          <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="form-control"
                            placeholder="old password"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill ">
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            placeholder="new password"
                          />
                        </div>
                      </div>
                      <button className="btn btn-info btn-lg w-100 mx-2">
                        Change
                      </button>
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

export default ChangePassword;
