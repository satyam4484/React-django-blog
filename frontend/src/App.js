import Layout from "./Components/Layout/Layout";
import { Routes, Route ,Navigate} from "react-router";
import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Auths/Login";
import ArticleDetail from "./Components/Articles/ArticleDetail";
import Category from "./Components/Articles/Category/Category";
import AuthContext from "./store/auth-request";
import Signup from "./pages/Auths/Signup";
import Profile from  "./pages/Profile/Profile";
import AddPost from  "./Components/Articles/AddPost";
import ChangePassword from "./pages/Auths/ChanePassword";

const App = () => {
  const auth = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        {!auth.isLoggedIn && <Route path="/login"  element={<Login />} />}
        {!auth.isLoggedIn && <Route path="/Signup"  element={<Signup />} />}
        {auth.isLoggedIn && <Route path="/changePassword"  element={<ChangePassword />} />}
        {auth.isLoggedIn && <Route path="/profile/:email" element={<Profile/>} />}
        {auth.isLoggedIn && <Route path='/add' element={<AddPost/>}/>}
        <Route path="/Article/:id" element={<ArticleDetail />} />
        <Route path="/Category/:category" element={<Category/>} />
        <Route path="*" element={ <Navigate replace to="/"/>}/>
      </Routes>
    </Layout>
  );
};

export default App;
