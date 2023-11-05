const User = require("../models/Auth"); // Import the User model, not Auth

const checkSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Use the User model to find the user by ID

    // Check if the user has an active subscription
    if (
      user.userSubscription &&
      user.userSubscription.length > 0 &&
      user.userSubscription[0].status
    ) {
      const currentDate = new Date();
      const expireDate = new Date(user.userSubscription[0].expireDate);

      // Check if the subscription has expired
      if (currentDate > expireDate) {
        // Subscription has expired, update the user's subscription status
        user.userSubscription[0].status = false;
        await user.save();
        return res.status(403).json({ message: "Subscription has expired" });
      }

      // The subscription is active, and you can access subscription details in the route
      req.subscription = user.userSubscription[0]; 
    } else {
      return res
        .status(403)
        .json({ message: "User has no active subscription" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check user's subscription" });
  }
};

module.exports = checkSubscription;
