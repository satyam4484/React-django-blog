import useRequest from "../hooks/Requests";
import { useState, useEffect, Fragment } from "react";
import { Routes, Route } from "react-router";
import ArticleList from "../Components/Articles/ArticleList";
import Spinnner from "../Components/UI/Spinner";
import { NavLink } from "react-router-dom";
import Category from "../Components/Articles/CategoryList";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const request = useRequest();

  const onResponse = (response) => {
    setLoading(false);
    setArticles(response.data);
  };

  useEffect(() => {
    request.sendRequest(
      {
        url: "articles/",
      },
      onResponse,
      (error) => console.log(error)
    );
  }, []);

  return (
    <Fragment>
      {loading && <Spinnner />}
      <Category/>
      <div className="container">
        <h1 className="fs-3 text-dark">All Posts</h1>
        <div className="row">
          {articles.map((article) => (
            <ArticleList key={article.id} article={article} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
