const express = require("express");
const router = express.Router();

const Url = require("../models/Url");
const UrlInfo = require("../models/UrlInfo");

router.get("/urlinfo", async (req, res) => {
  try {
    let urlInfo = await UrlInfo.findOne({ name: "UrlInfo" });
    if (urlInfo) {
      return res.json(urlInfo);
    } else {
      return res.status(404).json("No info found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      let urlInfo = await UrlInfo.findOne({ name: "UrlInfo" });
      // Update the URLInfo Collection
      let newURLInfo = {
        urlsCreated: urlInfo.urlsCreated,
        urlHits: urlInfo.urlHits + 1,
        name: "UrlInfo",
      };

      UrlInfo.findOneAndUpdate({ name: "UrlInfo" }, newURLInfo, function (
        err,
        doc
      ) {
        if (err) {
          console.log("Error Updating fields");
        }
        console.log("Updated urlHits");
      });
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
