import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [user, setUser] =  useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      axios.get(`http://localhost:8000/user/${id}`)
        .then((response) => {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data)); // Store fetched data
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [id]);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Preview image before uploading
    setUser((prevUser) => ({
      ...prevUser,
      profileImage: URL.createObjectURL(file),
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await axios.post(`http://localhost:8000/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: newProfileImage,
      }));
  
      // Store in localStorage
      const updatedUser = { ...user, profileImage: newProfileImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
    <h2>Profile</h2>
    <div className="icon">
      {user.profileImage ? (
        <img src={user.profileImage} alt="Profile" className="profile-image" />
      ) : (
        <FaUserCircle size={100} />
      )}
    </div>
      <div className="profile-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email ID :</strong> {user.email}</p>
      </div>

      {/* Image Upload Section */}
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} >Profile Picture</button>
    </div>
  );
}

export default Profile;
