import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import BeatLoader from "react-spinners/BeatLoader";
import ChangePassword from "./ChangePassword";

const EditProfile = () => {
  const uname = localStorage.getItem("username");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    uname: "",       
    newUname: "",      
  });

  const [errorMessages, setErrorMessages] = useState({
    error: "",
    message: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/user/profile/${uname}`);
        toast.success("Fetching Details...");
        const userData = response.data;
        setFormData({
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          uname: userData.uname,
          newUname: "", 
        });
      } catch (error) {
        toast.error("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [uname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/user/update-profile/${uname}`,
        formData
      );

      toast.success(response.data.message);
      setTimeout(() => {
        toast.success("Redirecting to User Profile...");
        localStorage.setItem("username", response.data.user.uname);
        setTimeout(() => {
          navigate("/edit-profile");
        }, 1000);
      }, 2000);
    } catch (error) {
      toast.error("Error updating profile.");
      setErrorMessages({
        error: error.response ? error.response.data.error : "Unknown error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="hero">
        <Nav />
      </div>
      <div className="bg1">
        <div className="container">
          <div className="title">Edit Profile</div>
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Mobile Number</span>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter your Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Current Username</span>
                <input
                  type="text"
                  name="uname"
                  placeholder="Current Username"
                  value={formData.uname}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="input-box">
                <span className="details">New Username</span>
                <input
                  type="text"
                  name="newUname"
                  placeholder="Enter your New Username"
                  value={formData.newUname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button">
              <button type="submit" style={{ cursor: "pointer" }}>
                Update Profile
              </button>
            </div>
          </form>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
