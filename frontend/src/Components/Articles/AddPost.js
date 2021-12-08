import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Fragment } from "react/cjs/react.production.min";
import useRequest from "../../hooks/Requests";
import Messages from "../UI/Messages";

const AddPost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const request = useRequest();
  const formdata = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    request.sendRequest(
      {
        url: "category/",
      },
      (response) => {
        setCategories(response.data);
      },
      (error) => console.log(error)
    );
  }, []);

  const dropDownHandler = (e) => {
    setCategory(e.target.value);
  };

  const successHandler = (response) => {
    if (response.error) {
      setError("danger");
      setErrorMessage("Please Enter a valid data");
      setTimeout(()=>{
        setError("");
      setErrorMessage("");
      },2000)
    }else{
        navigate(-1);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("category", category);
    if (image != null) {
      formdata.append("image", image);
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    request.sendRequest(
      {
        url: "articles/",
        method: "POST",
        headers: myHeaders,
        body: formdata,
      },
      successHandler,
      (error) => console.log(error)
    );
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Fragment>
      {error && <Messages error={error} message={errorMessage} />}
      <div className="container card mb-3">
        <form onSubmit={formHandler}>
          <h1 className="my-4 text-info fs-3 text-center">
            Add Posts And Show Your Skills
          </h1>
          <div className="form-group my-2">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="form-control"
              placeholder="Enter Your Post title "
            />
          </div>
          <div className="form-group my-2">
            <label>Content</label>
            <textarea
              type="text"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="form-control"
              rows="8"
            />
          </div>
          <div className="form-group my-3">
            <label>Choose Image</label>
            <input
              type="file"
              onChange={imageHandler}
              className="form-control-file mx-auto"
            />
          </div>
          <div className="form-group my-3">
            <label>Category</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={dropDownHandler}
            >
              {/* <option selected>Open this select menu</option> */}
              {categories.map((cat) => {
                return (
                  <option key={cat.label} value={cat.value}>
                    {cat.label}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddPost;
