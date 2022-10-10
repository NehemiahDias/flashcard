import React, { useEffect, useState } from "react";
import CreateForm from "./CreateForm";
import "./Create.css";

function CreateFlashcard() {
  const [createFlash, setCreateFlash] = useState(false);

  const toggleCreateForm = () => {
    setCreateFlash(createFlash ? false : true);
  };

  // useEffect(() => {
  //   if (localStorage.getItem('redirect') === 'true'){
  //     window.location.reload();
  //     localStorage.removeItem('redirect');
  //   }
  // }, [])

  return (
    <section id="create-flashcard">
      <div className="information">
        <div className="intro">
          <h1>Create Your Own Flash Cards Free!</h1>
          <p>
            Creating study resources can be time consuming, expensive, and
            difficult. Not with The Deck! Time consuming? No, just click create,
            type the info, and done as easy as that! Expensive? Definitely not,
            The Deck is 100% free of charges and ads! Difficult? It's so easy,
            you don't even need to create an account! No emails, passwords,
            paywalls, ads! Completely hassle free, so what are you waiting for?
            Get Studying!
          </p>
        </div>
        <div className="start-now">
          <div className="cta">
            <p>Begin your studying journey for FREE!</p>
            <button
              onClick={() => {
                toggleCreateForm();
                setTimeout(() => {
                  window.scrollTo(0, document.body.scrollHeight);
                }, 200);
              }}>
              CREATE DECK
            </button>
          </div>
        </div>
      </div>
      {createFlash && <CreateForm toggleForm={toggleCreateForm} />}
    </section>
  );
}

export default CreateFlashcard;
