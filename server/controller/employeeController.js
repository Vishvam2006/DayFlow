import User from "../models/User.js";

const getEmployees = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "employee" });

    return res.status(200).json({
      success: true,
      employeesCount: count,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Fetch Employee error" });
  }
};

export { getEmployees };
