import useRequest from "../../hooks/Requests";
import { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);
  const request = useRequest();

  useEffect(() => {
    request.sendRequest(
      {
        url: "category/",
      },
      (response) => setCategory(response.data),
      (error) => console.log(error)
    );
  }, []);
  return (
      
    <div className="nav-scroller py-1 mb-2">
      <nav className="nav d-flex justify-content-between">
        {category.map(element=> <NavLink key={element.label} className="p-2 text-info fs-5" to={`/category/${element.value}`}>
              {element.label}
            </NavLink>)}
      </nav>
    </div>
  );
};

export default Category;
