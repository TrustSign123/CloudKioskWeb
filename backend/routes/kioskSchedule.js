const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const KioskCode = require("../models/KioskCode");
const Kiosk = require("../models/Kiosk");

router.post("/schedule/:kioskCode", fetchUser, async (req, res) => {
  try {
    const { kioskContentArray, kioskContentTypeArray, startDate, endDate } =
      req.body;
    const kioskCode = req.params.kioskCode;

    // Find the Kiosk associated with the given Kiosk code
    const kiosk = await Kiosk.findOne({ kioskCode: kioskCode });
    const kioskcode = await KioskCode.findOne({ KioskCode: kioskCode });

    if (!kiosk || !kioskcode) {
      return res.status(404).json({ message: "Not Found" });
    }

    const scheduleSharedId = new mongoose.Types.ObjectId();

    // Construct kioskContent object to hold all elements
    const kioskContent = [];

    // Loop through each item in kioskContentArray and kioskContentTypeArray
    for (let i = 0; i < kioskContentArray.length; i++) {
      const contentSharedId = new mongoose.Types.ObjectId();

      // Construct kioskContent object for each item and push it into kioskContent array
      kioskContent.push({
        KioskContent: kioskContentArray[i],
        KioskContentFileType: kioskContentTypeArray[i],
        _id: contentSharedId,
      });
    }

    // Push the constructed kioskContent object into kioskSchedule array for both kiosk and kioskcode
    kiosk.kioskSchedule.push({
      kioskContent: kioskContent,
      startDate: startDate,
      endDate: endDate,
      _id: scheduleSharedId,
    });

    kioskcode.kioskSchedule.push({
      kioskContent: kioskContent,
      startDate: startDate,
      endDate: endDate,
      _id: scheduleSharedId,
    });

    // Save changes
    await kiosk.save();
    await kioskcode.save();

    res.status(201).json({ message: "Kiosk content added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/schedule/:id", fetchUser, async (req, res) => {
  try {
    const scheduleId = req.params.id;

    // Find the Kiosk associated with the given Kiosk code
    const kiosk = await Kiosk.findOne({
      "kioskSchedule._id": scheduleId,
    });

    const kioskcode = await KioskCode.findOne({
      "kioskSchedule._id": scheduleId,
    });

    if (!kiosk || !kioskcode) {
      return res.status(404).json({ message: "Not Found" });
    }

    // Find and remove the specific Kiosk content
    const content = kiosk.kioskSchedule.id(scheduleId);
    const contentCode = kioskcode.kioskSchedule.id(scheduleId);

    if (!content || !contentCode) {
      return res.status(404).json({ message: "Kiosk content not found 2" });
    }

    // console.log(contentCode);

    content.deleteOne();
    contentCode.deleteOne();
    await kiosk.save();
    await kioskcode.save();

    res.status(201).json({ message: "schedule delete successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
