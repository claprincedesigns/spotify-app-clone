import { clerkClient } from "@clerk/express";

export const protectRoute = (req, res, next) => {
  const { userId } = req.auth;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - You must be logged in" });
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  const { userId } = req.auth;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - You must be logged in" });
  }

  try {
    const currentUser = await clerkClient.users.getUser(userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden - You must be an admin" });
    }
    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
