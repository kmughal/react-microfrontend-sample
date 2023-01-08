import { useEffect } from "react";
import { getAssetsForMicroFrontend } from "./utils";

const MicroFrontEnd = ({ name, host }) => {
  const containerId = `${name}-container`;
  
  useEffect(() => {
    getAssetsForMicroFrontend(name, containerId);
  }, [containerId, name]);

  return <main class="container" id={containerId}></main>;
};

export default MicroFrontEnd;
