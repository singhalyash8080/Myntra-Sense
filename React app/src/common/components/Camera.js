import * as React from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Landing.module.css";
import { Link } from "react-router-dom";
import { addImage, addItemList } from "../../redux/actions";

import Webcam from "react-webcam";

const Camera = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [cam, setcam] = useState(true);
  const dispatch = useDispatch();
  dispatch(addItemList('',[]))

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    //console.log(imageSrc.substring(23));
    dispatch(addImage(imageSrc.substring(23)));
    setImgSrc(imageSrc);
    setcam(!cam);
    //eslint-disable-next-line
  }, [webcamRef, setImgSrc, cam]);

  const retake = () => {
    setcam(true);
  };

  const videoConstraints = {
    width: 317,
    height: 336,
     //facingMode: "user",
    facingMode: { exact: "environment" },
  };
  return (
    <div className={styles.came}>
      {cam && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />

          <button
            className={`${styles.landing_btn} ${styles.capture}`}
            onClick={capture}
          >
            Capture photo
          </button>
        </>
      )}

      {imgSrc && !cam && (
        <div>
          <img src={imgSrc} alt="" />
          <div className={styles.confirm}>
            <Link to="/Results">
              <button className={`${styles.landing_btn} ${styles.capture}`}>
                Proceed
              </button>
            </Link>
            <button
              className={`${styles.landing_btn} ${styles.capture}`}
              onClick={retake}
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
