import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import defaultAvatar from "../Images/userAvatar.svg";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(user?.photo || defaultAvatar);

  // 🔹 Handle profile photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPhoto(imageURL);

      // 🔹 Placeholder for API upload logic
      // const formData = new FormData();
      // formData.append("photo", file);
      // await fetch("API_ENDPOINT_HERE", {
      //   method: "POST",
      //   body: formData,
      // });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // 🔹 Placeholder for API integration
    // await fetch("API_ENDPOINT_HERE", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ firstName, lastName, email, photo }),
    // });

    alert("Profile updated successfully (API connection pending).");
    navigate("/profile");
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-header">
        <RiArrowLeftLine
          size={25}
          className="arrow-left-icon"
          onClick={() => navigate(-1)}
        />
        <h1>Edit Profile</h1>
      </div>

      <form onSubmit={handleSave} className="edit-profile-form">
        <div className="photo-upload-section">
          <div className="photo-wrapper">
            <img
              src={photo}
              alt="Profile"
              className="edit-profile-photo"
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </div>
          <p className="upload-hint">Tap the photo to upload a new one</p>
        </div>

        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            disabled
            placeholder="Email address"
          />
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
