import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./Components/UI/Spinner";
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(()=>"./pages/Auths/Login");

const Agent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login/>}/>
      </Routes>
    </Suspense>
  );
};
export default Agent;
