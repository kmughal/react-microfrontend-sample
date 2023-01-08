const addScriptTagAsync = (src, scriptId) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = scriptId;
    script.crossOrigin = "";
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onabort = (e) => reject(e);
    document.head.appendChild(script);
  });

const renderMicroFrontend = (renderMethodName, containerId) =>
  window[renderMethodName] && window[renderMethodName](containerId);

const attachMicroFrontend = (json, name, scriptId, containerId) => {
  const promises = json
    .filter((x) => x.name === name)[0]
    .files.map(async (path) => await addScriptTagAsync(path, scriptId));
  Promise.allSettled(promises).then(() =>
    renderMicroFrontend(`render${name}`, containerId)
  );
};

const getAssetsForMicroFrontend = (name, containerId) => {
  const scriptId = `micro-frontend-script-${name}`;
  if (document.getElementById(scriptId)) {
    renderMicroFrontend(`render${name}`, containerId);
    return;
  }
  
  const META_DATA_KEY = "micro_frontend_metadata";
  const metaData = localStorage.getItem(META_DATA_KEY);
  if (metaData) {
    attachMicroFrontend(JSON.parse(metaData), name, scriptId, containerId);
    return;
  }

  fetch("http://localhost:9000/micro-frontends")
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem(META_DATA_KEY, JSON.stringify(json));
      attachMicroFrontend(json, name, scriptId, containerId);
    });
};

export { getAssetsForMicroFrontend };
