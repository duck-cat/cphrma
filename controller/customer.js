const path = require('path');
const ExcelHandler = require('../utils/excelHandeler');

const handler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Customer');

const ALL_FIELDS = ['member_id', 'name', 'gender', 'mobile', 'email', 'dob', 'category', 'd_name', 'address'];

const REQUIRED_FIELDS = ['member_id', 'name', 'gender', 'mobile', 'dob', 'category', 'address'];

function validateFields(body) {
  const missing = REQUIRED_FIELDS.filter(
    (field) => body[field] === undefined || body[field] === null || body[field] === ''
  );
  return missing;
}

// POST /api/v1/customer
exports.createcustomer = (req, res) => {
  const missing = validateFields(req.body);
  if (missing.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are mandatory.',
      missing_fields: missing,
    });
  }

  const record = {};
  ALL_FIELDS.forEach((field) => {
    record[field] = req.body[field] ?? '';
  });

  try {
    handler.create(record);
    return res.status(201).json({ status: 'success', message: 'Record created.', data: record });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// GET /api/v1/customer
exports.getAllcustomer = (req, res) => {
  try {
    const data = handler.read();
    return res.status(200).json({ status: 'success', count: data.length, data });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// GET /api/v1/customer/:index
exports.getcustomerByIndex = (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index)) {
    return res.status(400).json({ status: 'error', message: 'Index must be a number.' });
  }

  try {
    const record = handler.readByIndex(index);
    if (record === null) {
      return res.status(404).json({ status: 'error', message: `No record found at index ${index}.` });
    }
    return res.status(200).json({ status: 'success', data: record });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// PUT /api/v1/customer/:index
exports.updatecustomer = (req, res) => {
  const index = req.params.index;
  if (!index) {
    return res.status(400).json({ status: 'error', message: 'please provide the index to delete.' });
  }

  const missing = validateFields(req.body);
  if (missing.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are mandatory.',
      missing_fields: missing,
    });
  }

  const updates = {};
  ALL_FIELDS.forEach((field) => {
    if (field !== 'member_id') updates[field] = req.body[field] ?? '';
  });

  try {
    handler.updateWhere({ member_id: index }, updates);
    return res.status(200).json({ status: 'success', message: 'Record updated.', data: updates });
  } catch (err) {
    if (err instanceof RangeError) {
      return res.status(404).json({ status: 'error', message: err.message });
    }
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// DELETE /api/v1/customer/:index
exports.deletecustomer = (req, res) => {
  const index = req.params.index;
  if (!index) {
    return res.status(400).json({ status: 'error', message: 'Please provide an index to delete.' });
  }

  try {
    handler.deleteWhere({ member_id: index });
    return res.status(200).json({ status: 'success', message: `Record at index ${index} deleted.` });
  } catch (err) {
    if (err instanceof RangeError) {
      return res.status(404).json({ status: 'error', message: err.message });
    }
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
