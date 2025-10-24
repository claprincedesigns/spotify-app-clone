import User from "../models/user.model.js";
export const authCallback = async (req, res, next) => {
  try {
    // Handle the callback logic here
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    // If user doesn't exist create the user and save in database
    if (!user) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({ message: "User authenticated successfully" });
  } catch (error) {
    console.error("Error during authentication:", error);
    next(error);
  }
};
