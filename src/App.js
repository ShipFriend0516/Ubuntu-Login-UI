import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import profileImg from "./Resources/profileImg.jpg";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [time, setTime] = useState("00 : 00");
  const [date, setDate] = useState("");

  const onClick = () => {
    setIsOpen((prev) => true);
  };

  setTimeout(() => {
    let date = new Date();
    setTime(
      `${String(date.getHours()).padStart(2, "0")} : ${String(date.getMinutes()).padStart(2, "0")}`
    );

    setDate(
      `${date.toLocaleDateString("en-EN", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}`
    );
  }, 1000);

  return (
    <div className="App">
      <div className="bg vw-100 vh-100">
        <div
          onClick={onClick}
          className={`${
            !isOpen ? "show" : "close"
          } w-100 h-100 flex-column justify-content-center align-items-center text-white`}
        >
          <div className="font1">{time}</div>
          <div>{date}</div>
          <div className="font2 mt-4">Click or Press a key to unlock</div>
        </div>
        <div
          className={`${
            isOpen ? "show" : "close"
          } w-100 h-100 flex-column justify-content-center align-items-center`}
        >
          <div className="profileImg">
            <img src={profileImg} alt="profileImg" />
          </div>
          <div className="profileName">Oracion</div>
          <div className="pwInputWrapper">
            <button
              className="button"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <IoChevronBack color="white" />
            </button>
            <input
              type={`${isHidden ? "password" : "text"}`}
              className="px-2 input pw"
              placeholder="Password"
            ></input>
            <button
              className="hidBtn"
              onClick={() => {
                setIsHidden((prev) => !prev);
              }}
            >
              {isHidden ? <AiFillEye color="white" /> : <AiFillEyeInvisible color="white" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
