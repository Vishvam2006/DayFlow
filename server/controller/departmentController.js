import Department from "../models/Department.js";


const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({
      dep_name,
      description,
    });
    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Add department server error" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Fetch department error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Delete department error" });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Delete department error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const { id } = req.params;
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true },
    );
    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department: updatedDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Update department error",
    });
  }
};

export { addDepartment, getDepartments, deleteDepartment, getDepartmentById, updateDepartment };
