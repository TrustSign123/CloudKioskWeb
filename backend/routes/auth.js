const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../cloud-kiosk-firebase-adminsdk-29vue-d0349601a2.json");
const fetchUser = require("../middleware/fetchuser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "cloud-kiosk.appspot.com/",
  });
} catch (error) {
  console.log(error);
}

router.get("/profile", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Auth.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Register a new user (using email/password)
router.post(
  "/register",
  [
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await Auth.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: false,
          error: "Sorry a user with this email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await Auth.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
    }
  }
);

// User login (using email/password)
router.post(
  "/login",
  [
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Auth.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct Credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwtSecret);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// User update (using id)
router.put("/updateuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password, upiId } = req.body;

    if (!name && !email && !password) {
      throw new Error("Empty user details are not allowed");
    } else {
      const user = await Auth.findById(userId);
      if (!user) {
        throw new Error(
          "User record doesn't exist or has been already deleted."
        );
      } else {
        const updatedUser = {};
        if (name) {
          updatedUser.name = name;
        }
        if (email) {
          if (email !== user.email) {
            // Check if the email exists already
            const otherUser = await Auth.findOne({ email });
            if (otherUser) {
              throw new Error(
                "Sorry, a user with this email already exists. Please use a different email."
              );
            }
          }
          updatedUser.email = email;
        }
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(password, salt);
          updatedUser.password = secPass;
        }
        if (upiId) {
          updatedUser.upiId = upiId;
        }

        await Auth.findByIdAndUpdate(userId, { $set: updatedUser });
        res.json({
          status: "SUCCESS",
          message: "User info updated successfully.",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "FAILED",
      message: error.message,
    });
  }
});

// User delete (using id)
router.delete("/deleteuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      throw new Error("Empty user details are not allowed");
    } else {
      await Auth.findByIdAndDelete(userId);
      res.json({
        status: "SUCCESS",
        message: "User deleted successfully.",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "FAILED",
      message: error.message,
    });
  }
});

module.exports = router;
