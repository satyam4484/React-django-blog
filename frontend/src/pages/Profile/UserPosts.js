import { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/auth-request";
import useRequest from "../../hooks/Requests";
import { Fragment } from "react/cjs/react.production.min";
import TableList from "./tableList.js";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const request = useRequest();
  const auth = useContext(AuthContext);

  const successHandler = (response) => {
    if (!response.error) {
      setPosts(response.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    request.sendRequest(
      {
        url: "articles/user/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      successHandler,
      (error) => console.log(error)
    );
  }, [setPosts]);

  const deletePostHandler = (id) => {
    const filterPosts = posts.filter((article) => article.id != id);
    setPosts(filterPosts);
  };

  return (
    <div>
      <h1>Your Posts</h1>
      {posts.length > 0 && (
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.no</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Posted On</th>
              <th scope="col-sm-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                <TableList
                  key={post.id}
                  post={post}
                  counter={index + 1}
                  onDelete={deletePostHandler}
                />
              );
            })}
          </tbody>
        </table>
      )}
      {posts.lenght === 0 && <h2>No Posts yet</h2>}
    </div>
  );
};

export default UserPosts;
