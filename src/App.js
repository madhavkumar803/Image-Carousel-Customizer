import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { createApi } from "unsplash-js";

const App = () => {
  const [data, setPhotosResponse] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [category, setcategory] = useState("dog");
  const [imgArray, setImgArray] = useState([]);
  const [count, setCount] = useState(0);
  var num = 0;

  const api = createApi({
    accessKey: "",
  });

  useEffect(() => {
    api.search
      .getPhotos({ query: category, orientation: "landscape" })
      .then((result) => {
        setPhotosResponse(result);
        setImgArray(result.response.results);
        setImgSrc(result.response.results[0].urls.regular);
        console.log(imgArray + "  img");
      })
      .catch((e) => {
        console.log("something went wrong!" + e);
      });
  }, [category]);

  const Body = () => {
    if (data === null) {
      return <div>Loading...</div>;
    } else if (data.errors) {
      return (
        <div>
          <div>{data.errors[0]}</div>
          <div>PS: Make sure to set your access token!</div>
        </div>
      );
    } else {
      return (
        <>
          {data.response.results.map((photo) => (
            <img
              id={photo.id + ""}
              key={photo.id}
              src={photo.urls.regular}
              onClickCapture={() => {
                var abc = document.getElementById(photo.id + "").style;
                abc.width = "180px";
                abc.height = "140px";
                abc.opacity = "1";
                setImgSrc(photo.urls.regular);
                console.log(photo.id);
              }}
              alt=""
            />
          ))}
        </>
      );
    }
  };

  return (
    <div className="main">
      <div className="container">
        <h3>Carousel</h3>
      </div>
      <div className="sideBar">
        <div className="top">
          <h3>Carousel</h3>
          <ul>
            <li
              onClick={() => {
                setcategory("dog");
                // setImgSrc("");
              }}
            >
              Dog
            </li>
            <li
              onClick={() => {
                setcategory("Phones");
                // setImgSrc("");
              }}
            >
              Phones
            </li>
            <li
              onClick={() => {
                setcategory("Beaches");
                // setImgSrc("");
              }}
            >
              Beaches
            </li>
            <li
              onClick={() => {
                setcategory("Houses");
                // setImgSrc("");
              }}
            >
              Houses
            </li>
          </ul>
        </div>
        <div className="bottom">
          <h3>Files</h3>
          <ul>
            {data != null
              ? data.response.results.map((name) => (
                  <li
                    {...num++}
                    onClick={() => {
                      setImgSrc(name.urls.regular);
                    }}
                  >
                    Landscape-{num}
                  </li>
                ))
              : "Loading.."}
          </ul>
        </div>
      </div>
      <div className="mainContent">
        <div className="leftButton">
          <button
            onClick={() => {
              console.log("count  " + count);
              console.log("imgArray  " + imgArray);
              setImgSrc(imgArray != null ? imgArray[count].urls.regular : "");
              setCount(count > 0 ? count - 1 : 9);
            }}
          >
            Left
          </button>
        </div>
        <div className="imageView">
          {imgSrc != "" ? (
            <img src={imgSrc} alt="" width="300" />
          ) : (
            <p>Please click on the below image to preview here....</p>
          )}
        </div>
        <div className="rightButton">
          <button
            onClick={() => {
              console.log(count);
              setImgSrc(imgArray != null ? imgArray[count].urls.regular : "");
              setCount(count < 9 ? count + 1 : 0);
            }}
          >
            Right
          </button>
        </div>
        <div className="bottom">
          <ul>
            <li>
              <Body />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
