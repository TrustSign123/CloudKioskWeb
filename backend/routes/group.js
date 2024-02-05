const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Kiosk = require("../models/Kiosk");
const Group = require("../models/Group");

router.get("/get-groups", fetchUser, async (req, res) => {
  try {
    const groups = await Group.find({ user: req.user.id });
    res.status(200).json({ groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create-group", fetchUser, async (req, res) => {
  try {
    const groupName = req.body.groupName;

    // Create a new group
    const group = new Group({
      user: req.user.id,
      groupName: groupName,
    });
    // Save the Kiosk code to the database
    await group.save();
    res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-group/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const groupName = req.body.groupName;

    const group = await Group.findById(id);

    if (!group) {
      res.status(404).json({ message: "Not found" });
    }

    group.groupName = groupName;
    await group.save();
    res.status(200).json({ message: "Group updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete-group/:id", fetchUser, async (req, res) => {
  try {
    // Get the group ID from the request
    const id = req.params.id;

    const group = await Group.findById(id);

    if (!group) {
      res.status(404).json({ message: "Not found" });
    } else {
      await group.deleteOne();
      res.status(200).json({ message: "Group deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/move-to-group", fetchUser, async (req, res) => {
  try {
    const { groupId, kioskId } = req.body;

    // Find the kiosk to move
    const kiosksCollection = await Kiosk.findById(kioskId);
    const groupsCollection = await Group.findById(groupId);

    if (!kiosksCollection || !groupsCollection) {
      return res.status(404).json({ error: "Not found" });
    }

    // Update the group, add the kiosk to the groupScreens array
    await Group.updateOne(
      { _id: groupId },
      {
        $push: { groupScreens: kiosksCollection },
      }
    );

    // Remove the kiosk from the kiosks collection
    await Kiosk.deleteOne({ _id: kioskId });

    res.status(200).json({ message: "Your screen moved to the group" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/ungroup", fetchUser, async (req, res) => {
  try {
    const { groupId, kioskId } = req.body;

    // Find the group using groupId
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Find the index of the kiosk in groupScreens array
    const kioskIndex = group.groupScreens.findIndex((kiosk) =>
      kiosk._id.equals(kioskId)
    );

    // Check if the kiosk is in the groupScreens array
    if (kioskIndex === -1) {
      return res.status(404).json({ error: "Kiosk not found in the group" });
    }

    // Get the kiosk from groupScreens array
    const kioskInGroup = group.groupScreens[kioskIndex];

    // Create a new Kiosk document using the kiosk data
    const newKiosk = new Kiosk({
      _id: kioskInGroup._id,
      user: kioskInGroup.user,
      kioskName: kioskInGroup.kioskName,
      kioskCode: kioskInGroup.kioskCode,
      androidId: kioskInGroup.androidId,
      settings: kioskInGroup.settings,
      kioskContent: kioskInGroup.kioskContent,
      kioskSchedule: kioskInGroup.kioskSchedule,
      date: kioskInGroup.date,
    });

    // Save the new Kiosk document
    await newKiosk.save();

    // Remove the kiosk from the groupScreens array
    group.groupScreens.splice(kioskIndex, 1);

    // Save the updated group
    await group.save();

    // Update the kiosk, remove the group reference
    await Kiosk.updateOne(
      { _id: kioskId },
      {
        $unset: { group: groupId },
      }
    );

    res.status(200).json({
      message:
        "Your screen has been removed from the group and transferred to the main Kiosk collection",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
