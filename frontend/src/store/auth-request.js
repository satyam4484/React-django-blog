import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router";


const AuthContext = React.createContext({
    isLoggedIn:false,
    user:{},
    token:'',
    onLogin:()=>{},
    onLogout:()=>{}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user,setUser] = useState('');
    const [token,setToken] = useState('');

    useEffect(() => {
        const authenticated = localStorage.getItem("user");
        if(authenticated) {
            setIsLoggedIn(true);
            setUser(JSON.parse(localStorage.getItem("user")))
            setToken(localStorage.getItem("token"));
        }
    },[]);

    const loginHandler = (token,user) => {
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(user));
        setIsLoggedIn(true);
        setUser(user);
        setToken(token);
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn:isLoggedIn,
            user:user,
            token:token,
            onLogin:loginHandler,
            onLogout:logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

