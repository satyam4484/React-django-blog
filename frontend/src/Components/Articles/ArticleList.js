import { Button } from "reactstrap";
import { useNavigate } from "react-router";

const ArticleList = (props) => {
  const navigate = useNavigate();
  const seePost = () => {
    console.log("post");
  };

  return (
    <div
      className="row border rounded overflow-hidden flex-md-row mb-4 h-md-250 position-relative"
      style={{ border: "4px solid" }}
    >
      <div className="col p-2 d-flex flex-column ">
        <strong className="d-inline-block fs-4 mb-2 text-warning">
          {props.article.category}
        </strong>
        <h3 className="mb-0">{props.article.title}</h3>
        <div className="mb-1 text-muted text-info">{props.article.created}</div>
        <p className="card-text mb-auto">
          {props.article.content.length > 100
            ? props.article.content.substring(0, 100) + "........."
            : props.article.content}
        </p>
        <div className="col-md-2 mt-2">
          <Button className="btn btn-primary" onClick={(e) => {
              navigate(`/Article/${props.article.title}`,{state:{articleId:props.article.id}});
          }}>
            Continue reading
          </Button>
        </div>
      </div>
      <div className="col-auto d-none mt-3 d-lg-block">
        <img
          width="200"
          height="200"
          src={props.article.image}
          alt="thumbnail"
        />
      </div>
    </div>
  );
};

export default ArticleList;
