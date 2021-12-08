import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthContextProvider } from "./store/auth-request";

ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>,
  document.getElementById("root")
);
