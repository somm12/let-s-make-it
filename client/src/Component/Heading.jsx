import React, { useState } from "react";
import { Link } from "react-router-dom";

const Heading = () => {
  const [test, setTest] = useState(0);
  return (
    <div>
      <h1>HELLO REACT </h1>
      <Link to="/">Home</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/list">List</Link>
    </div>
  );
};

export default Heading;
