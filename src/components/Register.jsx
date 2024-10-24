import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../index.css";
import { BASE_URL } from "../config";
import MainNav from "./MainNav";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const Register = () => {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    uname: "",
    password: "",
    cpassword: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    error: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const load = () => {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          loading ? "block" : "hidden"
        }`}
      >
        <div className="bg-white p-5 rounded-lg">
          <BeatLoader loading={loading} className="text-cyan-900 text-3xl" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    checkPasswordMatch();
  }, [formData.password, formData.cpassword]);
  const checkPasswordMatch = () => {
    const { password, cpassword } = formData;
    const msgElement = document.getElementById("message");

    if (password && cpassword) {
      if (password === cpassword) {
        msgElement.textContent = "Password matches.";
        msgElement.classList.add("match");
        msgElement.classList.remove("nomatch");
      } else {
        msgElement.textContent = "Passwords do not match.";
        msgElement.classList.add("nomatch");
        msgElement.classList.remove("match");
      }
    } else {
      msgElement.textContent = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.uname ||
      !formData.password ||
      !formData.cpassword
    ) {
      toast.error("Fill all details properly");
      return;
    }

    setLoading(true);

    const phoneNumber = formData.mobile;
    try {
      const response = await axios.post(
        BASE_URL + "/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      toast.success(response.data.message);

      setTimeout(() => {
        toast.success("Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="hero">
        <MainNav />
      </div>
      <div className="bg1">
        <div className="container">
          <div className="title">Register to NoteNexus</div>
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email Id"
                  required
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
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9."
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
              <div className="input-box">
                <span className="details">Username</span>
                <input
                  type="text"
                  name="uname"
                  placeholder="Enter your Username"
                  required
                  value={formData.uname}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long."
                />
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="password"
                  name="cpassword"
                  placeholder="Confirm your Password"
                  required
                  value={formData.cpassword}
                  onChange={handleChange}
                />
                <span className="message" id="message"></span>
              </div>
            </div>
            <div className="button">
              <button type="submit" id="aButton" style={{ cursor: "pointer" }}>
                Register
              </button>
              <span className="lmessage1" id="llogin_message">
                {errorMessages.error}
              </span>
            </div>
            <div className="asignup">
              Already have an account?{" "}
              <a href="/login" className="bsignup">
                Login
              </a>{" "}
              here
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
