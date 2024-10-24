import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 
import Nav from "../components/Nav";
import { BASE_URL } from "../config";

const ViewNote = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/note/${id}`);
        setNote(response.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]); 

  return (
    <div>
      <Nav />
      <div className="bg1">
        <div className="container">
          <h2 className="title">View Note</h2>
          <form>
            <div className="user-details">
              <div className="input-box1 w-full mb-4">
                <label className="text-[#CCBA78] pb-2 block mb-2">Title</label>
                <input
                  type="text"
                  value={note?.title || ""}
                  readOnly
                  className="w-full p-2 border"
                />
              </div>
              <div className="input-box1 w-full pb-4">
                <label className="text-[#CCBA78] block mb-2">Content</label>
                <textarea
                  value={note?.content || ""}
                  readOnly
                  className="w-full p-2 h-48 border"
                ></textarea>
              </div>
            </div>
            <div className="button">
              <button
                type="button"
                id="aButton"
                onClick={() => navigate("/view-notes")}
                style={{
                  cursor: "pointer",
                }}
              >
                Back to View Notes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
