import React from "react";

const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }

  if (success === true) {
    return <div className="message">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
