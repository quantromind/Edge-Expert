const User = require("../models/User");
const Property = require("../models/Property");
const Enquiry = require("../models/Enquiry");
const Contact = require("../models/Contact");

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (admin)
exports.getStats = async (req, res, next) => {
  try {
    const [totalProperties, totalUsers, totalEnquiries, totalContacts] =
      await Promise.all([
        Property.countDocuments(),
        User.countDocuments(),
        Enquiry.countDocuments(),
        Contact.countDocuments(),
      ]);

    // Breakdowns
    const [
      activeProperties,
      soldProperties,
      rentedProperties,
      newEnquiries,
      contactedEnquiries,
      brokers,
      customers,
      developers,
      featuredCount,
    ] = await Promise.all([
      Property.countDocuments({ status: "available" }),
      Property.countDocuments({ status: "sold" }),
      Property.countDocuments({ status: "rented" }),
      Enquiry.countDocuments({ status: "new" }),
      Enquiry.countDocuments({ status: "contacted" }),
      User.countDocuments({ role: "broker" }),
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "developer" }),
      Property.countDocuments({ featured: true }),
    ]);

    // Recent enquiries
    const recentEnquiries = await Enquiry.find()
      .populate("property", "title location")
      .sort("-createdAt")
      .limit(5);

    // Recent properties
    const recentProperties = await Property.find()
      .sort("-createdAt")
      .limit(5);

    // Category breakdown
    const categoryBreakdown = await Property.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalProperties,
          totalUsers,
          totalEnquiries,
          totalContacts,
          activeProperties,
          soldProperties,
          rentedProperties,
          featuredCount,
        },
        users: {
          brokers,
          customers,
          developers,
          total: totalUsers,
        },
        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
          contacted: contactedEnquiries,
        },
        recentEnquiries,
        recentProperties,
        categoryBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (admin)
exports.getUsers = async (req, res, next) => {
  try {
    const { role, search, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: Number(page),
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id
// @access  Private (admin)
exports.updateUser = async (req, res, next) => {
  try {
    const { role, isActive } = req.body;
    const updateData = {};
    if (role) updateData.role = role;
    if (typeof isActive === "boolean") updateData.isActive = isActive;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};
