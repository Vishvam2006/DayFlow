import Attendance from "../models/Attendance.js";

const checkIn = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      employee: req.user._id,
      date: today,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already checked in today",
      });
    }

    const attendance = new Attendance({
      employee: req.user._id,
      date: today,
      checkIn: new Date(),
    });

    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Check-In Succesfull",
      attendance,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Attendance Server Error",
    });
  }
};

const checkOut = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      employee: req.user._id,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: "Check In first",
      });
    }

    attendance.checkOut = new Date();

    const diff = (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);

    attendance.workHours = diff;

    if (diff >= 8) attendance.status = "Present";
    else if (diff >= 4) attendance.status = "Half Day";
    else attendance.status = "Absent";

    await attendance.save();

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Attendance Server Error",
    });
  }
};

const getAttendance = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      employee: req.user._id,
      date: today,
    });

    res.status(200).json({
      success: true,
      attendance,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Fetch Attendance Server Error",
    });
  }
};

export { checkIn, checkOut, getAttendance };
