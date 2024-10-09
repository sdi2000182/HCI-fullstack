import React, { useState } from "react";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import "./Buttons.css"

function Submit() {
  const [isMessageSent, setMessageSent] = useState(false);

  const handleSubmit = () => {

    setMessageSent(true);

    setTimeout(() => {
      setMessageSent(false);
    }, 5000); 
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        className="view-grades"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "10px",
          backgroundColor: isMessageSent ? "grey" : null,
          cursor: isMessageSent ? "not-allowed" : "pointer",
        }}
        onClick={handleSubmit}
        disabled={isMessageSent}
      >
        ΥΠΟΒΟΛΗ
        <SendSharpIcon style={{ marginLeft: "5px" }} />
      </button>

      {isMessageSent && (
        <p style={{ marginLeft: "10px", color: "green" }}>
          Έγινε υποβολή της ερώτησής σας!
        </p>
      )}
    </div>
  );
}

export default Submit;
