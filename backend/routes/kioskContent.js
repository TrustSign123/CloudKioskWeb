const express = require("express");
const router = express.Router();
const KioskCode = require("../models/KioskCode");
const Kiosk = require("../models/Kiosk");

router.post("/content/:kioskCode", async (req, res) => {
  try {
    const kioskCode = req.params.kioskCode;
    const { kioskContent } = req.body;

    // Find the Kiosk associated with the given Kiosk code
    const kiosk = await Kiosk.findOne({ kioskCode: kioskCode });
    const kioskcode = await KioskCode.findOne({ KioskCode: kioskCode });

    if (!kiosk || !kioskcode) {
      return res.status(404).json({ message: "Kiosk not found" });
    }

    // Add the new content to the Kiosk
    kiosk.kioskContent.push({ KioskContent: kioskContent });
    kioskcode.kioskContent.push({ KioskContent: kioskContent });
    await kiosk.save();
    await kioskcode.save();

    res.status(201).json({ message: "Kiosk content added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add Kiosk content" });
  }
});

router.put("/content/:contentIdKiosk/:contentIdKioskCode", async (req, res) => {
  try {
    // Find the Kiosk that contains the content
    const kiosk = await Kiosk.findOne({
      "kioskContent._id": req.params.contentIdKiosk,
    });

    const kioskcode = await KioskCode.findOne({
      "kioskContent._id": req.params.contentIdKioskCode,
    });

    if (!kiosk || !kioskcode) {
      return res.status(404).json({ message: "Kiosk content not found" });
    }

    // Find and update the specific Kiosk content
    const content = kiosk.kioskContent.id(req.params.contentIdKiosk);
    const contentCode = kioskcode.kioskContent.id(
      req.params.contentIdKioskCode
    );
    if (!content || !contentCode) {
      return res.status(404).json({ message: "Kiosk content not found" });
    }

    content.KioskContent = req.body.kioskContent;
    contentCode.KioskContent = req.body.kioskContent;
    await kiosk.save();
    await kioskcode.save();

    res.status(200).json({ message: "Kiosk content updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Kiosk content" });
  }
});

router.delete(
  "/content/:contentIdKiosk/:contentIdKioskCode",
  async (req, res) => {
    try {
      // Find the Kiosk that contains the content
      const kiosk = await Kiosk.findOne({
        "kioskContent._id": req.params.contentIdKiosk,
      });

      const kioskcode = await KioskCode.findOne({
        "kioskContent._id": req.params.contentIdKioskCode,
      });

      if (!kiosk || !kioskcode) {
        return res.status(404).json({ message: "Kiosk content not found" });
      }

      // Find and remove the specific Kiosk content
      const content = kiosk.kioskContent.id(req.params.contentIdKiosk);
      const contentCode = kioskcode.kioskContent.id(
        req.params.contentIdKioskCode
      );

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
      res.status(500).json({ message: "Failed to delete Kiosk content" });
    }
  }
);

module.exports = router;
