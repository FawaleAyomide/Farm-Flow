import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiMore2Line } from "react-icons/ri";
import displayImg from "../Images/displayImg.svg";
import "../Style/profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    // <div className="profile-wrapper">
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
              <h1>John Doe</h1>
              <p>johndoe@gmail.com</p>
            </div>
            <button className="profile-btn">Edit Profile</button>
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
        <button className="logout-btn">Log Out</button>
      </div>
    </div>
    // </div>
  );
};

export default Profile;
