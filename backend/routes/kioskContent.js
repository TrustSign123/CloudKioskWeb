const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const admin = require("firebase-admin");
const KioskCode = require("../models/KioskCode");
const Kiosk = require("../models/Kiosk");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Firebase Storage
const storage = admin.storage();

router.post(
  "/content/:kioskCode",
  upload.single("kioskContent"),
  async (req, res) => {
    try {
      const kioskCode = req.params.kioskCode;
      const kioskContent = req.file;
      const filename = `${uuidv4()}-${kioskContent.originalname}`;
      const KioskContentFileName = kioskContent.originalname;
      const KioskContentFileSize = kioskContent.size;
      const KioskContentFileType = kioskContent.mimetype;
      const file = storage.bucket().file(filename);
      const bucket = storage.bucket();

      // console.log(kioskContent)

      // Find the Kiosk associated with the given Kiosk code
      const kiosk = await Kiosk.findOne({ kioskCode: kioskCode });
      const kioskcode = await KioskCode.findOne({ KioskCode: kioskCode });

      if (!kiosk || !kioskcode) {
        return res.status(404).json({ message: "Kiosk not found" });
      }

      await file.save(kioskContent.buffer);
      const privateUrl = filename;

      const [publicUrl] = await bucket.file(filename).getSignedUrl({
        action: "read",
        expires: "01-01-3000",
      });

      // Generate a unique _id for this content
      const sharedId = new mongoose.Types.ObjectId();

      // Add the new content to the Kiosk
      kiosk.kioskContent.push({
        KioskContent: publicUrl,
        KioskContentName: privateUrl,
        KioskContentFileName,
        KioskContentFileSize,
        KioskContentFileType,
        _id: sharedId,
      });
      kioskcode.kioskContent.push({
        KioskContent: publicUrl,
        KioskContentName: privateUrl,
        KioskContentFileType,
        _id: sharedId,
      });
      await kiosk.save();
      await kioskcode.save();

      res.status(201).json({ message: "Kiosk content added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add Kiosk content" });
    }
  }
);

router.put("/content/:id", upload.single("kioskContent"), async (req, res) => {
  try {
    const conetntId = req.params.id;
    const kioskContent = req.file;
    const filename = `${uuidv4()}-${kioskContent.originalname}`;
    const KioskContentFileName = kioskContent.originalname;
    const KioskContentFileSize = kioskContent.size;
    const KioskContentFileType = kioskContent.mimetype;
    const file = storage.bucket().file(filename);
    const bucket = storage.bucket();

    // Find the Kiosk that contains the content
    const kiosk = await Kiosk.findOne({
      "kioskContent._id": conetntId,
    });

    const kioskcode = await KioskCode.findOne({
      "kioskContent._id": conetntId,
    });

    if (!kiosk || !kioskcode) {
      return res.status(404).json({ message: "Kiosk content not found" });
    }

    // Find and update the specific Kiosk content
    const content = kiosk.kioskContent.id(conetntId);
    const contentCode = kioskcode.kioskContent.id(conetntId);
    if (!content || !contentCode) {
      return res.status(404).json({ message: "Kiosk content not found" });
    }

    await file.save(kioskContent.buffer);
    const privateUrl = filename;

    const [publicUrl] = await bucket.file(filename).getSignedUrl({
      action: "read",
      expires: "01-01-3000",
    });

    // Delete the old image from Firebase Storage using the full path
    const oldImageUrl = content.KioskContentName;
    const oldImageFile = bucket.file(oldImageUrl);

    await oldImageFile.delete();

    content.KioskContent = publicUrl;
    content.KioskContentName = privateUrl;
    content.KioskContentFileName = KioskContentFileName;
    content.KioskContentFileSize = KioskContentFileSize;
    content.KioskContentFileType = KioskContentFileType;
    contentCode.KioskContent = publicUrl;
    contentCode.KioskContentName = privateUrl;
    contentCode.KioskContentFileType = KioskContentFileType;

    await kiosk.save();
    await kioskcode.save();

    res.status(200).json({ message: "Kiosk content updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Kiosk content" });
  }
});

router.delete("/content/:id", async (req, res) => {
  try {
    const conetntId = req.params.id;
    const bucket = storage.bucket();
    // Find the Kiosk that contains the content
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

    // Delete the old image from Firebase Storage using the full path
    const oldImageUrl = content.KioskContentName;
    const oldImageFile = bucket.file(oldImageUrl);

    await oldImageFile.delete();

    content.deleteOne();
    contentCode.deleteOne();
    await kiosk.save();
    await kioskcode.save();

    res.status(200).json({ message: "Kiosk content deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Kiosk content" });
  }
});

module.exports = router;
