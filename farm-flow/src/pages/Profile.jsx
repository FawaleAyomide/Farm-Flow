import { useAuth } from "../Auth/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiUser3Line,
  RiMore2Line,
  RiCameraLine,
} from "react-icons/ri";
import displayImg from "../Images/displayImg.svg";
import "../Style/profile.css";
import { useState, useEffect } from "react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Load persisted image or fallback to default
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem("profilePhoto") || user?.avatar || displayImg
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleBack = () => navigate(-1);

  // ✅ Save selected image locally
  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("profilePhoto", selectedImage);
    }
  }, [selectedImage]);

  // ✅ Handle image selection/upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl);

      // ✅ Placeholder for backend API upload
      /*
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setSelectedImage(data.avatarUrl);
      localStorage.setItem("profilePhoto", data.avatarUrl);
      */
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-wrapper">
        {/* Header */}
        <div className="head">
          <RiArrowLeftLine
            size={25}
            className="arrow-left-icon"
            onClick={handleBack}
          />
          <h1>User Profile</h1>
          <RiMore2Line size={25} className="arrow-left-icon" />
        </div>

        {/* User Info */}
        <div className="user-details">
          <div className="profile-photo-container">
            <label htmlFor="profile-upload" className="upload-label">
              <img
                src={selectedImage}
                alt="User avatar"
                className="display-img"
              />
              <div className="camera-overlay">
                <RiCameraLine size={22} className="camera-icon" />
              </div>
            </label>

            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {uploading && <p className="upload-status">Uploading...</p>}
          {error && <p className="upload-error">{error}</p>}

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

      {/* Logout */}
      <div className="logout-wrapper">
        <button className="logout-btn" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;



// import { useAuth } from "../Auth/AuthProvider";
// import { useNavigate,Link } from "react-router-dom";
// import { RiArrowLeftLine } from "react-icons/ri";
// import { RiArrowRightSLine } from "react-icons/ri";
// import { RiUser3Line } from "react-icons/ri";
// import { RiMore2Line } from "react-icons/ri";
// import displayImg from "../Images/displayImg.svg";
// import "../Style/profile.css";

// const Profile = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="user-profile">
//       <div className="profile-wrapper">
//         <div className="head">
//           <RiArrowLeftLine size={25} className="arrow-left-icon" onClick={handleBack} />
//           <h1>User Profile</h1>
//           <RiMore2Line size={25} className="arrow-left-icon" />
//         </div>
//         <div className="user-details">
//           <img
//             src={displayImg}
//             alt="user-img"
//             width="160"
//             height="160"
//             className="display-img"
//           />
//           <div className="middle-content">
//             <div className="text-wrapper">
//               <h1>
//                 {user?.firstName && user?.lastName
//                   ? `${user.firstName} ${user.lastName}`
//                   : "User"}
//               </h1>
//               <p>{user?.email || "No email available"}</p>
//             </div>
//             <Link to="/editprofile" className="profile-btn">
//                 Edit Profile
//               </Link>
//             <div className="user-profile-btn">
//               <div className="left">
//                 <RiUser3Line size={20} className="user-icon" />
//                 <p>User Profile</p>
//               </div>
//               <RiArrowRightSLine size={25} className="user-icon" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="logout-wrapper">
//         <button className="logout-btn" onClick={logout} >Log Out</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
