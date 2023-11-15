const express = require("express");
const router = express.Router();
const Auth = require("../models/Auth");
const fetchUser = require("../middleware/fetchuser");
const checkSubscription = require("../middleware/checkSubscription");
require("dotenv").config();

const subscriptionPlans = {
  free: {
    name: "3 Days Free Trial",
    price: 0,
    duration: 3,
    storage: "10 MB",
    cluster: 1,
    oneTimeOnly: true,
  },
  oneMonth: {
    name: "One Month Plan",
    price: 599,
    duration: 30,
    storage: "1.5 GB",
    cluster: 10,
    oneTimeOnly: false,
  },
  oneYear: {
    name: "One Year Plan",
    price: 5999,
    duration: 365,
    storage: "20 GB",
    cluster: 150,
    oneTimeOnly: false,
  },
};

router.post("/purchase", fetchUser, async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id);
    const { plan } = req.body;

    // Check if the plan exists
    if (!subscriptionPlans[plan]) {
      return res.status(400).json({ message: "Invalid subscription plan" });
    }

    // Check if the user is eligible for a free trial
    if (plan === "free") {
      // Check if the user hasn't used the free trial before
      if (user.hasUsedFreeTrial) {
        return res.status(400).json({ message: "Free trial already used" });
      }
    }

    // Calculate the expiration date
    const currentDate = new Date();
    const expireDate = new Date(currentDate);
    expireDate.setDate(expireDate.getDate() + subscriptionPlans[plan].duration);

    // Update the user's subscription information in your database
    user.userSubscription = [
      {
        status: true,
        validityPlan: plan,
        startDate: currentDate,
        expireDate,
        price: subscriptionPlans[plan].price,
        storage: subscriptionPlans[plan].storage,
        cluster: subscriptionPlans[plan].cluster,
      },
    ];

    // Update user.hasUsedFreeTrial if it's a free trial
    if (plan === "free") {
      user.hasUsedFreeTrial = true;
    }

    await user.save();

    res.json({ message: "Subscription purchased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to purchase subscription" });
  }
});

router.get("/protected-route", fetchUser, checkSubscription, (req, res) => {
  // This route is protected and can only be accessed by users with active subscriptions
  const subscriptionDetails = req.subscription;
  res.json({
    message: "Protected route accessed",
    subscription: subscriptionDetails,
  });
});

module.exports = router;
