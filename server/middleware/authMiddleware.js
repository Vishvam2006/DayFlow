import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token Not Provided" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token Not Valid" });
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Verification : ", error.message);
    return res
    .status(401)
    .json({ success: false, error: error.message });
  }
};

export default verifyUser;
