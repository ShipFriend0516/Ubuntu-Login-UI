import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import profileImg from "./Resources/profileImg.jpg";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [time, setTime] = useState("00 : 00");
  const [date, setDate] = useState("");

  const onClick = () => {
    // setIsOpen((prev) => false);
  };

  const updateTime = () => {
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
  };

  useEffect(() => {
    updateTime();
    setInterval(() => {
      updateTime();
    }, 1000);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const TRANSITION = 0.5 * 1000;
    const element = document.getElementById("cover"); // 요소를 선택
    if (!isLoading) {
      const handleAnimationEnd = () => {
        element.classList.add("close");
        setTimeout(() => {
          element.classList.add("d-none");
          setIsCoverOpen(false);
        }, TRANSITION);
        // setIsCoverOpen(false); // 애니메이션이 끝나면 요소를 숨깁니다.
      };
      element.addEventListener("click", handleAnimationEnd);

      console.log("isCoverOpen", isCoverOpen, "isOpen", isOpen);

      // return () => {
      //   element.removeEventListener("click", handleAnimationEnd);
      //   console.log("isCoverOpen", isCoverOpen, "isOpen", isOpen);
      // };
    }
  }, [isOpen, isLoading]);

  return (
    <div className="App">
      <div className="bg vw-100 vh-100">
        {isLoading ? (
          <div
            className={`d-flex w-100 h-100 flex-column justify-content-center align-items-center text-white`}
          >
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {isCoverOpen && (
              <div
                id="cover"
                onClick={onClick}
                className={`${
                  isCoverOpen ? "show" : "close"
                } bg z-3 position-absolute w-100 h-100 flex-column justify-content-center align-items-center text-white`}
              >
                <div className="font1">{time}</div>
                <div>{date}</div>
                <div className="font2 mt-4">Click or Press a key to unlock</div>
              </div>
            )}
            <div
              className={`w-100 h-100 d-flex flex-column justify-content-center align-items-center`}
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
                    setIsCoverOpen((prev) => !prev);
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
