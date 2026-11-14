const path = require('path');
const ExcelHandler = require('../utils/excelHandeler');

const inventoryHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Inventory');
const supplierHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'supplier');
const customerHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Customer');
const approvalsHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Approvals');
const billingHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Billing');

const EXPIRING_SOON_WINDOW_DAYS = 60;

function countBy(rows, field) {
  const counts = {};
  rows.forEach((row) => {
    const key = String(row[field] ?? '').trim() || 'Unknown';
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts).map(([label, count]) => ({ label, count }));
}

function toNumber(value) {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

// GET /api/v1/dashboard/inventory-expiry-summary
exports.getInventoryExpirySummary = (req, res) => {
  try {
    const rows = inventoryHandler.read();
    const now = new Date();

    let expired = 0;
    let expiringSoon = 0;
    let safe = 0;
    let unknown = 0;

    rows.forEach((row) => {
      const expiryDate = new Date(row.expiry_date);
      if (isNaN(expiryDate.getTime())) {
        unknown++;
        return;
      }
      const daysLeft = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      if (daysLeft < 0) {
        expired++;
      } else if (daysLeft <= EXPIRING_SOON_WINDOW_DAYS) {
        expiringSoon++;
      } else {
        safe++;
      }
    });

    return res.status(200).json({
      status: 'success',
      data: { expired, expiringSoon, safe, unknown, total: rows.length, asOf: now.toISOString().slice(0, 10) },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// GET /api/v1/dashboard/supplier-sales-summary
exports.getSupplierSalesSummary = (req, res) => {
  try {
    const rows = inventoryHandler.read();
    const limit = parseInt(req.query.limit, 10) || 10;

    const totals = {};
    rows.forEach((row) => {
      const supplier = String(row.supplier_name ?? '').trim();
      if (!supplier) return;
      const quantity = toNumber(row.quantity);
      const value = quantity * toNumber(row.price);
      if (!totals[supplier]) totals[supplier] = { supplier, quantity: 0, value: 0 };
      totals[supplier].quantity += quantity;
      totals[supplier].value += value;
    });

    const suppliers = Object.values(totals)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit)
      .map((s) => ({ ...s, value: Math.round(s.value * 100) / 100 }));

    return res.status(200).json({
      status: 'success',
      data: { suppliers, totalSuppliers: supplierHandler.count() },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// GET /api/v1/dashboard/customer-summary
exports.getCustomerSummary = (req, res) => {
  try {
    const rows = customerHandler.read();
    return res.status(200).json({
      status: 'success',
      data: {
        total: rows.length,
        byCategory: countBy(rows, 'category'),
        byGender: countBy(rows, 'gender'),
      },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// GET /api/v1/dashboard/orders-billing-summary
exports.getOrdersBillingSummary = (req, res) => {
  try {
    const orderRows = approvalsHandler.read();
    const billingRows = billingHandler.read();

    let totalRevenue = 0;
    let outstandingAmount = 0;
    billingRows.forEach((row) => {
      const status = String(row.status ?? '').trim().toLowerCase();
      const total = toNumber(row.total);
      if (status === 'paid') {
        totalRevenue += total;
      } else if (status === 'pending' || status === 'overdue') {
        outstandingAmount += total;
      }
    });

    return res.status(200).json({
      status: 'success',
      data: {
        orders: {
          total: orderRows.length,
          byStatus: countBy(orderRows, 'status'),
        },
        billing: {
          total: billingRows.length,
          byStatus: countBy(billingRows, 'status'),
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          outstandingAmount: Math.round(outstandingAmount * 100) / 100,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
