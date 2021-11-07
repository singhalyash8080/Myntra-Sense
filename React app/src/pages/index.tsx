import LandingPage from '../common/components/Landing'
import Camera from "../common/components/Camera";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState(false);

  const changeState = () => {
    console.log(state);
    setState(!state);
  };

  return (
    <>
      {state ? <Camera /> : <LandingPage onClick={changeState} />}
    </>
  );
}
