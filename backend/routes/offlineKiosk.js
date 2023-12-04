const express = require("express");
const router = express.Router();
const OfflineKioskCode = require("../models/OfflineCode");

// Function to generate a unique Kiosk code
function generateUniqueKioskCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = 12;
  let kioskCode = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    kioskCode += characters.charAt(randomIndex);
  }

  return kioskCode;
}

router.get("/offline-code", async (req, res) => {
  try {
    const generatedCode = generateUniqueKioskCode();

    const code = await OfflineKioskCode.findOne({
      OfflineKioskCode: generatedCode,
    });

    if (code) {
      return res.status(400).json({
        error: "This code is already generated",
      });
    }

    const offlineCode = new OfflineKioskCode({
      OfflineKioskCode: generatedCode,
    });

    await offlineCode.save();
    res.status(200).json({ generatedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/offline-codes", async (req, res) => {
  try {
    const codes = await OfflineKioskCode.find();
    res.json({ codes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/offline-code", async (req, res) => {
  try {
    const code = req.body.code;

    const existingCode = await OfflineKioskCode.findOne({
      OfflineKioskCode: code,
    });

    if (!existingCode) {
      return res.status(404).json({
        error: "Code not found",
      });
    }

    if (existingCode.status) {
      return res.status(400).json({
        error: "This code has already been used",
      });
    }

    // Update the status to true since the code is being used
    existingCode.status = true;
    await existingCode.save();

    res.status(200).json({ status: "Code successfully used" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/offline-codes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const code = await OfflineKioskCode.findById(id);
    if (!code) {
      return res.status(404).json({ message: "Not Found" });
    }
    await OfflineKioskCode.findByIdAndDelete(id);
    res.status(200).json("Code Deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
