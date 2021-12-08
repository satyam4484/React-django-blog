import useRequest from "../../hooks/Requests";
import { useNavigate,useLocation } from "react-router";

const TableList = (props) => {
    const request = useRequest();
    const navigate = useNavigate();

  const deletePostHandler = () => {
    request.sendRequest({
        url:`articles/${props.post.id}`,
        method:'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    },(response)=>{props.onDelete(props.post.id)},(error) => console.log(error));
  };

  const viewArticleHandler = () => {
    navigate(`/Article/${props.post.title}`,{state:{articleId:props.post.id}});
  }
  return (
    <tr>
      <th scope="row">{props.counter}</th>
      <td>{props.post.title}</td>
      <td>{props.post.category}</td>
      <td>{props.post.created}</td>
      <td className="">
        <button className="btn btn-primary btn-sm mx-1 my-1 col" onClick={viewArticleHandler}>view</button>
        <button
          className="btn btn-danger btn-sm mx-1 my-1 col"
          onClick={deletePostHandler}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default TableList;
