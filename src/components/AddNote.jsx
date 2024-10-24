import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../index.css";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Nav from "../components/Nav";

const AddNote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(`${BASE_URL}/api/user/add-note`, {
        ...formData
      });
      
      toast.success(response.data.message);

      setTimeout(() => {
        toast.success("Redirecting to View Notes");
        setTimeout(() => {
            navigate("/view-notes");
        }, 1000);
      }, 2000);

    } catch (error) {
      toast.error("Error adding note.");
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
          <div className="title">Add Notes</div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="user-details">
              <div className="input-box1 w-full">
                <span className="details">Title</span>
                <input
                  type="text"
                  name="title"
                  className="w-full"
                  placeholder="Enter Title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box1 w-full mt-4">
                <span className="details">Content</span>
                <textarea
                  name="content"
                  rows="5"
                  className="w-full"
                  placeholder="Enter Content"
                  required
                  value={formData.content}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="button">
              <button type="submit" id="aButton" style={{ cursor: "pointer" }}>
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
