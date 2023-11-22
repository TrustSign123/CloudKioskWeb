const express = require("express");
const router = express.Router();
const Kiosk = require("../models/Kiosk");
const KioskCode = require("../models/KioskCode");
const fetchUser = require("../middleware/fetchuser");
const checkSubscription = require("../middleware/checkSubscription");

// Function to generate a unique Kiosk code
function generateUniqueKioskCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
  const codeLength = 8;
  let kioskCode = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    kioskCode += characters.charAt(randomIndex);
  }

  return kioskCode;
}

// Endpoint to generate a Kiosk code using the android id
router.post("/kiosk-code", async (req, res) => {
  try {
    // Get the user's IP address from the request
    const androidId = req.body.androidId;

    if (!androidId) {
      return res
        .status(400)
        .json({ message: "Android Id is missing in the request body" });
    }

    // Check if there is an existing Kiosk code for this IP
    let existingCode = await KioskCode.findOne({ androidId: androidId });

    if (!existingCode) {
      // Generate a new unique Kiosk code
      const newKioskCode = generateUniqueKioskCode();

      // Create a new KioskCode document
      const kioskCode = new KioskCode({
        KioskCode: newKioskCode,
        androidId: androidId,
      });

      // Save the Kiosk code to the database
      await kioskCode.save();

      res.status(201).json({
        kioskCode: newKioskCode,
        status: kioskCode.status,
        androidId: kioskCode.androidId,
        kioskContent: [],
      });
    } else {
      res.status(200).json({
        kioskCode: existingCode.KioskCode,
        status: existingCode.status,
        androidId: existingCode.androidId,
        kioskContent: existingCode.kioskContent,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate Kiosk code" });
  }
});

// Endpoint to fecth a Kiosk
router.get("/get-kiosk", fetchUser, async (req, res) => {
  try {
    const kiosks = await Kiosk.find({ user: req.user.id });
    res.json(kiosks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Kiosks" });
  }
});

// Endpoint to create a new Kiosk
router.post("/kiosk", fetchUser, async (req, res) => {
  try {
    // Get the Kiosk code from the request
    const kioskCode = req.body.kioskCode;

    // Find the KioskCode document with the provided code
    const kioskCodeDocument = await KioskCode.findOne({ KioskCode: kioskCode });

    if (kioskCodeDocument && !kioskCodeDocument.status) {
      // Create a new Kiosk document
      const newKiosk = new Kiosk({
        user: req.user.id,
        kioskName: req.body.kioskName,
        kioskCode: kioskCode,
      });

      // Save the Kiosk to the database
      await newKiosk.save();

      // Update the KioskCode status to true
      kioskCodeDocument.status = true;
      await kioskCodeDocument.save();

      res.status(201).json({ message: "Kiosk created successfully" });
    } else {
      res.status(400).json({ message: "Invalid or already used Kiosk code" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Kiosk" });
  }
});

// Endpoint to edit a Kiosk
router.put("/kiosk/:id", async (req, res) => {
  try {
    // Get the Kiosk ID from the request
    const kioskId = req.params.id;

    // Find the Kiosk document by ID
    const kiosk = await Kiosk.findById(kioskId);

    if (!kiosk) {
      res.status(404).json({ message: "Kiosk not found" });
    } else {
      kiosk.kioskName = req.body.kioskName;
      await kiosk.save();
      res.status(200).json({ message: "Kiosk updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Kiosk" });
  }
});

// Endpoint to delete a Kiosk
router.delete("/kiosk/:id", async (req, res) => {
  try {
    // Get the Kiosk ID from the request
    const kioskId = req.params.id;

    // Find and delete the Kiosk document by ID
    const kiosk = await Kiosk.findByIdAndDelete(kioskId);

    if (!kiosk) {
      res.status(404).json({ message: "Kiosk not found" });
    } else {
      // Check if this Kiosk is associated with a Kiosk code
      if (kiosk.kioskCode) {
        // Find and delete the associated Kiosk code
        await KioskCode.findOneAndDelete({ KioskCode: kiosk.kioskCode });
      }
      res.status(200).json({ message: "Kiosk deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Kiosk" });
  }
});

module.exports = router;
