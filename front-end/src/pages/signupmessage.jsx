import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/index.css";
import "../css/signupmessage.css"

function SignupMessage() {
  const [link, setLink] = useState("");

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; nameCookie=`);
    let myName;
    if (parts.length === 2) {
      myName = parts.pop().split(";").shift();
      async function generateLink() {
        try {
          console.log('myName: ', myName);
          const response = await axios.post("http://localhost:8000/linkinfo", {
            nameCookie: myName,
          });
          setLink(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      generateLink();
    }
  }, []);

  return (
    <div className="meta-container">
    <div className="signup-message-container">
      {link ? (
        <p>
          Send your partner this unique link {" "}
          <a
            href={`/users/${link}`}>{`localhost:3000/users/${link}`}</a> so they can enter their preferences. They might want to resubmit someday, so save this link! You can't recover it without help from an administrator. After they've submitted, you can head over to <a
            href={`/home`}>{`localhost:3000/home/`}</a> to use the app!
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>

  );
}

export default SignupMessage;
