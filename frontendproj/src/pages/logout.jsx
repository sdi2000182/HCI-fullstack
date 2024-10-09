import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []); 

  return <div>Logout</div>;
}
