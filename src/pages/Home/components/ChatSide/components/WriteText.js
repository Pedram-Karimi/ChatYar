import { useState } from "react"; // react-hooks

import "./writeText.css"; // styles

// icons

import { MdSend } from "react-icons/md";

// context

import { useAddText } from "../../../../../contexts/AddTextCtx";

function WriteText() {
  // variables

  const [inputTextMess, setInputTextMess] = useState("");

  // contexts ---

  const { changeMessage } = useAddText();

  // submit text mess to db ----

  const submitTextMess = (e) => {
    e.preventDefault();
    setInputTextMess("");
    changeMessage(inputTextMess);
  };

  //
  return (
    <div className="writeText">
      <div className="writing-text-div">
        <form onSubmit={submitTextMess}>
          <input
            placeholder="Write a message..."
            className="text-mess-input"
            value={inputTextMess}
            onChange={(e) => {
              setInputTextMess(e.target.value);
            }}
          />
          {inputTextMess && (
            <MdSend
              color="#20b2c2"
              onClick={submitTextMess}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                fontSize: "19px",
              }}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default WriteText;
