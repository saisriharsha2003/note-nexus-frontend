import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Nav from "../components/Nav";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

const ViewNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const MAX_CONTENT_LENGTH = 10;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/view-notes`);
        setNotes(response.data.notes || []);
        toast.success(response.data.message);
      } catch (error) {
        toast.error("Failed to fetch notes.");
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleEdit = (noteId) => {
    navigate(`/edit-note/${noteId}`);
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/user/delete-note/${noteId}`
      );
      toast.success(response.data.message);
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      toast.error("Failed to delete note.");
      console.error("Error deleting note:", error);
    }
  };

  const handleView = (noteId) => {
    navigate(`/view-note/${noteId}`);
  };

  return (
    <div>
      <Nav />
      <div className="bg1">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <h2 className="title">All Notes</h2>

          {loading ? (
            <p>Loading notes...</p>
          ) : (
            <table className="paybill w-full">
              <thead>
                <tr>
                  <th className="w-full">Title</th>
                  <th className="w-full">Content</th>
                  <th className="w-full">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.length > 0 ? (
                  notes.map((note) => (
                    <tr key={note._id}>
                      <td className="w-full">{note.title}</td>
                      <td className="w-full">
                        {note.content.length > MAX_CONTENT_LENGTH
                          ? `${note.content.slice(0, MAX_CONTENT_LENGTH)}...`
                          : note.content}
                        {note.content.length > MAX_CONTENT_LENGTH && (
                          <button
                            onClick={() => handleView(note._id)}
                            className="text-blue-500 ml-2"
                          >
                            Read More
                          </button>
                        )}
                      </td>
                      <td className="w-full">
                        <button
                          onClick={() => handleView(note._id)}
                          className="mr-4 text-blue-500"
                        >
                          <i
                            className="fa fa-eye text-3xl"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <button
                          onClick={() => handleEdit(note._id)}
                          className="mr-4"
                        >
                          <i
                            className="fa fa-pencil text-3xl"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <button
                          onClick={() => handleDelete(note._id)}
                          className="text-red-500"
                        >
                          <i
                            className="fa fa-trash text-3xl"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      No notes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;
