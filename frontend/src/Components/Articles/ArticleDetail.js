import { useLocation, Link, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import useRequest from "../../hooks/Requests";
import Spinner from "../UI/Spinner";

const ArticleDetail = () => {
  const location = useLocation();
  const request = useRequest();
  const navigate = useNavigate();
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(true);

  const onResponse = (response) => {
    setLoading(false);
    setArticle(response.data);
  };

  useEffect(() => {
    request.sendRequest({
        url: `articles/${location.state.articleId}`,
      },
      onResponse,
      (error) => console.log(error)
    );
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && (
        <div className="container mt-3 border bg-light ">
          <button
            onClick={(e) => navigate(-1)}
            className="font-weight-bold mt-2 btn btn-outline-primary"
          >
            Back to Articles
          </button>
          <h1 className="display-2 text-center fs-2 mt-2 text-decoration-underline text-warning">
            {article.title}
          </h1>
          <div className="d-flex row">
            <div className="text-center col p-4 text-wrap">
              <img id="main-image" className="w-75" src={article.image} />
            </div>
            <div className="mx-auto col order-2">
              <p>{article.content}</p>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col text-wrap fs-3">
              Category:<NavLink to={`/category/${article.category}`}> {article.category} </NavLink>
              <h5>{article.created}</h5>
            </div>
          </div>
          <hr />
        </div>
      )}
    </Fragment>
  );
};

export default ArticleDetail;
