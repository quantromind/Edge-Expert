const Contact = require("../models/Contact");

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully! We will get back to you soon.",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (admin)
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark contact as read
// @route   PUT /api/contact/:id
// @access  Private (admin)
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (admin)
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
