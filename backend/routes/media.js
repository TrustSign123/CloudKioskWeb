const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const admin = require("firebase-admin");
const fetchUser = require("../middleware/fetchuser");
const KioskCode = require("../models/KioskCode");
const Kiosk = require("../models/Kiosk");
const Media = require("../models/Media");
const Playlist = require("../models/Playlist");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Firebase Storage
const storage = admin.storage();

router.get("/media-display", fetchUser, async (req, res) => {
  try {
    const media = await Media.find({ user: req.user.id });
    res.status(200).json({ media });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/media-uploads",
  upload.single("media"),
  fetchUser,
  async (req, res) => {
    try {
      const media = req.file;
      const filename = `${uuidv4()}-${media.originalname}`;
      const mediaFileName = media.originalname;
      const mediaFileSize = media.size;
      const mediaFileType = media.mimetype;
      const file = storage.bucket().file(filename);
      const bucket = storage.bucket();

      // console.log(media)

      await file.save(media.buffer);
      const privateUrl = filename;

      const [publicUrl] = await bucket.file(filename).getSignedUrl({
        action: "read",
        expires: "01-01-3000",
      });

      // Add the new content to the Kiosk
      const newMedia = new Media({
        user: req.user.id,
        mediaContent: publicUrl,
        mediaContentName: privateUrl,
        mediaContentFileName: mediaFileName,
        mediaContentFileSize: mediaFileSize,
        mediaContentFileType: mediaFileType,
      });

      // Save the Kiosk to the database
      await newMedia.save();

      res.status(201).json({ newMedia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add Media content" });
    }
  }
);

router.delete("/media-delete/:id", async (req, res) => {
  try {
    const conetntId = req.params.id;
    const bucket = storage.bucket();
    // Find the Kiosk that contains the content
    const media = await Media.findById(conetntId);

    if (!media) {
      return res.status(404).json({ message: "Media content not found" });
    }

    // Delete the old image from Firebase Storage using the full path
    const oldImageUrl = media.mediaContentName;
    const oldImageFile = bucket.file(oldImageUrl);

    await oldImageFile.delete();

    await media.deleteOne();

    res.status(200).json({ message: "Kiosk content deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Kiosk content" });
  }
});

router.post("/publish-media/:kioskCode", fetchUser, async (req, res) => {
  try {
    const kioskCode = req.params.kioskCode;
    const contentUrlArray = req.body.contentUrl;
    const contentTypeArray = req.body.contentType;

    // Find the Kiosk associated with the given Kiosk code
    const kiosk = await Kiosk.findOne({ kioskCode: kioskCode });
    const kioskcode = await KioskCode.findOne({ KioskCode: kioskCode });

    if (!kiosk || !kioskcode) {
      return res.status(404).json({ message: "Not Found" });
    }

    // Iterate through the arrays and save each element individually
    for (let i = 0; i < contentUrlArray.length; i++) {
      const sharedId = new mongoose.Types.ObjectId();

      kiosk.kioskContent.push({
        KioskContent: contentUrlArray[i],
        KioskContentFileType: contentTypeArray[i],
        _id: sharedId,
      });

      kioskcode.kioskContent.push({
        KioskContent: contentUrlArray[i],
        KioskContentFileType: contentTypeArray[i],
        _id: sharedId,
      });
    }

    await kiosk.save();
    await kioskcode.save();

    res.status(201).json({ message: "Kiosk content added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/publish-delete/:id", fetchUser, async (req, res) => {
  try {
    const conetntId = req.params.id;

    const kiosk = await Kiosk.findOne({
      "kioskContent._id": conetntId,
    });

    const kioskcode = await KioskCode.findOne({
      "kioskContent._id": conetntId,
    });

    if (!kiosk || !kioskcode) {
      return res.status(404).json({ message: "Kiosk content not found" });
    }

    // Find and remove the specific Kiosk content
    const content = kiosk.kioskContent.id(conetntId);
    const contentCode = kioskcode.kioskContent.id(conetntId);

    if (!content || !contentCode) {
      return res.status(404).json({ message: "Kiosk content not found 2" });
    }

    content.deleteOne();
    contentCode.deleteOne();
    await kiosk.save();
    await kioskcode.save();

    res.status(200).json({ message: "Kiosk content deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/playlist", fetchUser, async (req, res) => {
  try {
    const playlist = await Playlist.find({ user: req.user.id });
    res.status(200).json({ playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create-playlist", fetchUser, async (req, res) => {
  try {
    const playlistName = req.body.playlistName;
    const contents = req.body.contents;
    const contentsType = req.body.contentsType;

    // Create an array to store playlist contents
    const playlistContents = [];

    // Loop through contents and contentsType arrays to populate playlistContents
    for (let i = 0; i < contents.length; i++) {
      playlistContents.push({
        playlistContent: contents[i],
        playlistContentFileType: contentsType[i],
      });
    }

    // Add the new content to the Playlist
    const newPlaylist = new Playlist({
      user: req.user.id,
      playlistName: playlistName,
      playlistContent: playlistContents,
    });

    // Save the Playlist to the database
    await newPlaylist.save();

    res.status(201).json({ newPlaylist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/playlist-delete/:id", async (req, res) => {
  try {
    const conetntId = req.params.id;
    // Find the Kiosk that contains the content
    const playlist = await Playlist.findById(conetntId);

    if (!playlist) {
      return res.status(404).json({ message: "Not found" });
    }

    await playlist.deleteOne();

    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Kiosk content" });
  }
});

module.exports = router;
