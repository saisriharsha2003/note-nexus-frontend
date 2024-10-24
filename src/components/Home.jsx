import React from "react";
import Nav from "../components/Nav"

const Home = () => {
  return (
    <div>
      <div className="hero">
        <Nav />
      </div>
      <div className="bg1">
        <div className="container" style={{ background: "black", opacity: 0.9 }}>
          <p className="text-4xl font-semibold text-[#CCBA78] flex justify-center items-center">
            Welcome to <span className="homep">NoteNexus</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
