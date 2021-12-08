import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import useRequest from "../../../hooks/Requests";
import ArticleList from "../ArticleList";
import Spinner from "../../UI/Spinner";

const Category = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const request = useRequest();
  const navigate = useNavigate();

  const onResponse = (response) => {
    setLoading(false);
    setArticle(response.data);
  };

  useEffect(() => {
    request.sendRequest(
      {
        url: `category/${params.category}`,
      },
      onResponse,
      (error) => console.log(error)
    );
  }, []);

  const gobackHandler = () => {
      navigate(-1);
  }
  return (
    <Fragment>
      {loading && <Spinner />}
      <div className="container">
        <h1 className="fs-3 text-dark">Articles - <span className="text-warning btn-link">{params.category}</span></h1>
        <div className="row">
          {article &&
            article.map((article) => (
              <ArticleList key={article.id} article={article} />
            ))}
          {article.length ===0 && (
            <div>
              <p className="text-danger fs-2 fw-bold">no Result Found!!!</p>
              <button className="mt-2 btn btn-danger" onClick={gobackHandler}>
                Go back
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Category;
