import ProfileContent from "./ProfileContent";
import UserPosts from "./UserPosts";

const Profile = () => {

  return (
    <div className="container">
      <div className="row card bg-light">
          <ProfileContent />
          <hr className="fs-2" />
          <UserPosts/>
      </div>
    </div>
  );
};

export default Profile;
