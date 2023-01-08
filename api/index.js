require("dotenv").config();
const Express = require("express");
const axios = require("axios").default;
const cors = require('cors');
const app = Express();

app.use(cors());

const getMicroFrontendBundle = async (req, res) => {
  
  Promise.allSettled(
    JSON.parse(process.env.SITE_DATA ?? []).map(async (siteData) => {
      const { name, host } = siteData;
      const { data } = await axios.get(`${siteData.host}/asset-manifest.json`);
      return { name, data, host };
    })
  ).then((data) => {
    const response = data
      .map((x) => ({ ...x.value }))
      .map((x) => {
        const {
          host,
          data: { files }
        } = x;

        const jsBundleFiles = Object.keys(files)
          .filter((x) => x.endsWith("js"))
          .map((x) => `${host}${files[x]}`);
        return { name: x.name, files: jsBundleFiles };
      });
    res.json(response);
  });
};

app.get("/micro-frontends", getMicroFrontendBundle);

app.get("/", (req, res) => res.send("hello world").status(200));

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("started server:", port);
});
