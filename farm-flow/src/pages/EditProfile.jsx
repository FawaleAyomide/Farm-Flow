// src/pages/EditProfile.jsx
import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine, RiCameraFill } from "react-icons/ri";
import defaultAvatar from "../Images/userAvatar.svg";

const EditProfile = () => {
  const { user, setUser, uploadProfileImage, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photo, setPhoto] = useState(user?.photo || defaultAvatar);
  const [fileUploading, setFileUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // When user selects a file: preview -> upload -> update global user
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPhoto(preview);
    setFileUploading(true);

    try {
      const uploadedUrl = await uploadProfileImage(file);
      if (uploadedUrl) {
        setPhoto(uploadedUrl); // Now updates with real Cloudinary URL
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setFileUploading(false);
    }
  };

  // Save other details (and current photo url if available)
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = { firstName, lastName, photo };
      const updatedUser = await updateProfile(payload);
      // update local context in case backend returned partial response
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        // fallback: ensure setUser with local changes
        setUser((prev) => ({ ...(prev || {}), firstName, lastName, photo }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...(user || {}), firstName, lastName, photo })
        );
      }
      navigate("/profile");
    } catch (err) {
      console.error("Save profile failed:", err);
      setError(err.message || "Failed to save profile. Try again.");
    } finally {
      setSaving(false);
    }
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
          <div className="photo-container">
            <img
              src={photo}
              alt="Profile"
              className="edit-profile-photo"
              onClick={() => document.getElementById("fileInput").click()}
            />

            <div
              className="camera-overlay"
              onClick={() => document.getElementById("fileInput").click()}
              aria-hidden
            >
              <RiCameraFill size={20} className="camera-icon" />
            </div>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </div>

          {fileUploading && (
            <p className="uploading-text">Uploading image...</p>
          )}
          {error && <p className="error-text">{error}</p>}
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
          <input type="email" value={user?.email || ""} disabled />
        </div>

        <button type="submit" className="save-btn" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;