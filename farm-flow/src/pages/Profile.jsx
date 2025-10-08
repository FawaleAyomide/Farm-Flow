import { useAuth } from "../Auth/AuthProvider";
import { useNavigate,Link } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiMore2Line } from "react-icons/ri";
import displayImg from "../Images/displayImg.svg";
import "../Style/profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="user-profile">
      <div className="profile-wrapper">
        <div className="head">
          <RiArrowLeftLine size={25} className="arrow-left-icon" onClick={handleBack} />
          <h1>User Profile</h1>
          <RiMore2Line size={25} className="arrow-left-icon" />
        </div>
        <div className="user-details">
          <img
            src={displayImg}
            alt="user-img"
            width="160"
            height="160"
            className="display-img"
          />
          <div className="middle-content">
            <div className="text-wrapper">
              <h1>                
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "User"}
              </h1>
              <p>{user?.email || "No email available"}</p>
            </div>
            <Link to="/editprofile" className="profile-btn">
                Edit Profile
              </Link>
            <div className="user-profile-btn">
              <div className="left">
                <RiUser3Line size={20} className="user-icon" />
                <p>User Profile</p>
              </div>
              <RiArrowRightSLine size={25} className="user-icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="logout-wrapper">
        <button className="logout-btn" onClick={logout} >Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
