import { useState, useEffect, useContext } from "react";
import { useLocation,useNavigate } from "react-router";
import AuthContext from "../../store/auth-request";
import useRequest from "../../hooks/Requests";
import { NavLink } from "react-router-dom";

const ProfileContent = () => {
  const [firstname,setfirstName] = useState('');
  const [lastName,setlastName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [edit,setEdit] = useState(false);
  const request = useRequest();
  
  const user = useContext(AuthContext).user;

  const editProfileHandler = () =>{
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    request.sendRequest({
      url:'user/',
      method:'PATCH',
      headers:myHeaders,
      body:JSON.stringify({
        first_name:firstname,
        last_name:lastName
      })
    },(response) => navigate(location.pathname),(error) => console.log(error));
  }
  return (
    <div className="col-md-8 mb-5">
      <div className="d-inline">
        <h3 className="text-center"> Profile </h3>
        <button className="btn btn-warning mx-2 my-2" onClick={()=>setEdit(true)}>edit Profile</button>
        <NavLink className="btn btn-warning mx-2 my-2" to="/changepassword">Change Password</NavLink>
      </div>
      <div className="row">
        <div className="col">
          <div class="form-group">
            <fieldset>
              <label class="form-label mt-4" for="readOnlyInput">
                First Name
              </label>
              {edit && <input
                class="form-control"
                id="readOnlyInput"
                type="text"
                value={firstname}
                onChange={(e) => setfirstName(e.target.value)}
                placeholder={user.first_name}
                
              />}
              {!edit && <input
                class="form-control"
                id="readOnlyInput"
                type="text"
                placeholder={user.first_name}
                readonly=""
              />}
            </fieldset>
          </div>
          {edit && <button className="btn btn-success bnt-sm mt-2" onClick={editProfileHandler}>update</button>}
          {edit && <button className="btn btn-danger bnt-sm mt-2 mx-2" onClick={() => setEdit(false)}>Cancel</button>}
        </div>
        <div className="col">
          <div class="form-group">
            <fieldset>
              <label class="form-label mt-4" for="readOnlyInput">
                Last Name
              </label>
              {!edit && <input
                class="form-control"
                id="readOnlyInput"
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                placeholder={user.last_name}
                readonly=""
              />}
              {edit && <input
                class="form-control"
                id="readOnlyInput"
                type="text"
                placeholder={user.last_name}
              />}
            </fieldset>
          </div>
        </div>
        <div className="col">
          <div class="form-group">
            <fieldset>
              <label class="form-label mt-4" for="readOnlyInput">
                Email
              </label>
              <input
                class="form-control"
                id="readOnlyInput"
                type="text"
                placeholder={user.email}
                readonly=""
              />
            </fieldset>
          </div>
          
        </div>
      </div>
    </div>

  );
};

export default ProfileContent;
