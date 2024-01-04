const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const admin = require("firebase-admin");
const fetchUser = require("../middleware/fetchuser");
const KioskCode = require("../models/KioskCode");
const Kiosk = require("../models/Kiosk");
const Media = require("../models/Media");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fetchuser = require("../middleware/fetchuser");
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
    const contentUrl = req.body.contentUrl;
    const contentType = req.body.contentType;

    // Find the Kiosk associated with the given Kiosk code
    const kiosk = await Kiosk.findOne({ kioskCode: kioskCode });
    const kioskcode = await KioskCode.findOne({ KioskCode: kioskCode });

    if (!kiosk || !kioskcode) {
      return res.status(404).json({ message: "Not Found" });
    }

    // Generate a unique _id for this content
    const sharedId = new mongoose.Types.ObjectId();

    // Add the new content to the Kiosk
    kiosk.kioskContent.push({
      KioskContent: contentUrl,
      KioskContentFileType: contentType,
      _id: sharedId,
    });
    kioskcode.kioskContent.push({
      KioskContent: contentUrl,
      KioskContentFileType: contentType,
      _id: sharedId,
    });
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

module.exports = router;
