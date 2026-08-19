const Property = require("../models/Property");

// @desc    Get all properties (with filters)
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res, next) => {
  try {
    const {
      type, transactionType, category, city, minPrice, maxPrice,
      bedrooms, postedBy, search, featured, page = 1, limit = 50,
      sort = "-createdAt",
    } = req.query;

    const filter = { isActive: true };

    if (type) filter.propertyType = type;
    if (transactionType) filter.transactionType = transactionType;
    if (category) filter.category = category;
    if (city) filter.city = { $regex: city, $options: "i" };
    if (featured === "true") filter.featured = true;
    if (postedBy) filter.postedByType = postedBy;
    if (bedrooms) filter.bedrooms = Number(bedrooms);

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Property.countDocuments(filter);

    const properties = await Property.find(filter)
      .populate("postedBy", "name email phone role")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get sell properties (for BUY tab on frontend)
// @route   GET /api/sellproperty
// @access  Public
exports.getSellProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({
      isActive: true,
      transactionType: { $in: ["Buy", "Sell"] },
    })
      .populate("postedBy", "name email phone")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("postedBy", "name email phone role company");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Increment view count
    property.views += 1;
    await property.save();

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
exports.getFeaturedProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ featured: true, isActive: true })
      .sort("-createdAt")
      .limit(20);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get properties by category
// @route   GET /api/properties/category/:category
// @access  Public
exports.getByCategory = async (req, res, next) => {
  try {
    const properties = await Property.find({
      category: req.params.category,
      isActive: true,
    })
      .populate("postedBy", "name email phone")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private (admin, broker, developer)
exports.createProperty = async (req, res, next) => {
  try {
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    // Set postedBy to current user if authenticated
    if (req.user) {
      req.body.postedBy = req.user._id;
    }

    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (admin, broker, developer)
exports.updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Handle new uploaded images (append to existing)
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => `/uploads/${file.filename}`);
      req.body.images = [...(property.images || []), ...newImages];
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (admin)
exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload property images
// @route   POST /api/properties/upload-images
// @access  Public / Authenticated
exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No image files uploaded",
      });
    }

    const host = req.get("host");
    const protocol = req.protocol;
    const urls = req.files.map(
      (file) => `${protocol}://${host}/uploads/${file.filename}`
    );

    res.status(200).json({
      success: true,
      message: `${req.files.length} image(s) uploaded successfully`,
      urls,
    });
  } catch (error) {
    next(error);
  }
};
