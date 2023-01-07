import { useEffect } from "react";

const MicroFrontEnd = ({ name, host }) => {
  const containerId = `${name}-container`;
  const renderMicroFrontend = () => {
    window[`render${name}`] && window[`render${name}`](containerId);
  };

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }
    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        Promise.allSettled(
          Object.keys(manifest.files)
            .filter((x) => x.includes(".js"))
            .map((key) => {
              return new Promise((resolve, reject) => {
                const path = `${host}${manifest.files[key]}`;
                const script = document.createElement("script");
                script.id = scriptId;
                script.crossOrigin = "";
                script.src = path;
                script.async = true;
                script.onload = () => resolve();
                script.onabort = (e) => reject(e);
                document.head.appendChild(script);
              });
            })
        ).then((x) => renderMicroFrontend());
      });
  }, [name, host]);

  return <main class="container" id={containerId}></main>;
};

export default MicroFrontEnd;
