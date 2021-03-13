import React, { useState, useEffect } from "react";
import "./MainPage.css";
import Post from "../Post/Post";
import uploadImage from "../../images/upload.png";
import { storage, auth } from "../firebase";

const MainPage = () => {
  const [postArr, setPostArr] = useState([]);
  const [progressBar, setProgressBar] = useState();

  useEffect(() => {
    getPost();
  });

  const getPost = () => {
    fetch("http://localhost:8080/post")
      .then((response) => response.json())
      .then((data) => {
        setPostArr(data);
      });
  };

  const upload = (event) => {
    let image = event.target.files[0];
    //const thisContext = this;
    if (image == null || image == undefined) return;

    var uploadTask = storage.ref("images").child(image.name).put(image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressBar(progress);
      },
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL);

          let payload = {
            postId: Math.floor(Math.random() * 100000).toString(),
            userId: JSON.parse(localStorage.getItem("users")).uid,
            postPath: downloadURL,
            timeStamp: new Date().getTime(),
            likeCount: 0,
          };

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            "Access-Control-Allow-Origin": "*",
            body: JSON.stringify(payload),
          };

          fetch("http://localhost:8080/post", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              getPost();
            })
            .catch((error) => {});
        });
      }
    );
  };

  return (
    <div>
      <div className="mainpage__container">
        <div className="mainpage__divider"></div>
        <div className="fileupload">
          <label for="file-upload">
            <img className="mainpage__uploadicon" src={uploadImage} />
          </label>
          <input id="file-upload" type="file" onChange={upload} />
        </div>
        <div className="mainpage__divider"></div>
      </div>
      <div className="upload_text">{progressBar}</div>
      {postArr.map((item, index) => (
        <Post
          id={item.postId}
          userName={item.userName}
          postImage={item.postPath}
          likes={item.likeCount}
        />
      ))}
    </div>
  );
};

export default MainPage;
