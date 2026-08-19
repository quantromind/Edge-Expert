const Enquiry = require("../models/Enquiry");
const Property = require("../models/Property");

// @desc    Submit new enquiry
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message, propertyType, transactionType, city, propertyId } = req.body;

    const enquiryData = {
      name,
      email,
      phone,
      message,
      propertyType,
      transactionType,
      city,
    };

    // Link to specific property if propertyId provided
    if (propertyId) {
      const property = await Property.findById(propertyId);
      if (property) {
        enquiryData.property = propertyId;
        // Increment enquiry count on property
        property.enquiryCount += 1;
        await property.save();
      }
    }

    const enquiry = await Enquiry.create(enquiryData);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully! We will contact you soon.",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (admin)
exports.getEnquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Enquiry.countDocuments(filter);

    const enquiries = await Enquiry.find(filter)
      .populate("property", "title location price images")
      .populate("assignedTo", "name email")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      page: Number(page),
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get enquiries for a specific property
// @route   GET /api/enquiries/property/:propertyId
// @access  Private (admin, broker)
exports.getPropertyEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({ property: req.params.propertyId })
      .populate("property", "title location price")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private (admin)
exports.updateEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (admin)
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted",
    });
  } catch (error) {
    next(error);
  }
};
