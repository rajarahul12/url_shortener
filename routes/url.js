const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");
const UrlInfo = require("../models/UrlInfo");

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  console.log("LONG URL ---> ", longUrl);

  const baseUrl = process.env.BASE_URI;
  console.log("BASE URL ", baseUrl);

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      let urlInfo = await UrlInfo.findOne({ name: "UrlInfo" });
      if (urlInfo) {
        console.log("-----> Found urlinfo");
      } else {
        console.log("-----> Create a collection");
        urlInfo = new UrlInfo({
          urlsCreated: 0,
          urlHits: 0,
          name: "UrlInfo",
        });
        await urlInfo.save();
      }

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        // Update the URLInfo Collection
        let newURLInfo = {
          urlsCreated: urlInfo.urlsCreated + 1,
          urlHits: urlInfo.urlHits,
          name: "UrlInfo",
        };

        UrlInfo.findOneAndUpdate({ name: "UrlInfo" }, newURLInfo, function (
          err,
          doc
        ) {
          if (err) {
            console.log("Error Updating fields");
          }
          console.log("Updated urlsCreated");
        });

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
