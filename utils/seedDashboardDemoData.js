const path = require('path');
const ExcelHandler = require('./excelHandeler');

const customerHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Customer');
const approvalsHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Approvals');
const billingHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Billing');

function pad(n, w) { return String(n).padStart(w, '0'); }
function fmt(d) { return d.toISOString().slice(0, 10); }
function addDays(d, days) { const r = new Date(d); r.setDate(r.getDate() + days); return r; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }

const TODAY = new Date('2026-11-14');

const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Krishna', 'Ishaan', 'Rohan',
  'Ananya', 'Diya', 'Saanvi', 'Aadhya', 'Kiara', 'Myra', 'Riya', 'Priya', 'Neha', 'Sanya'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Reddy', 'Rao', 'Patel', 'Nair', 'Iyer', 'Singh', 'Kumar'];
const categories = ['Retail', 'Member', 'Clinic', 'Other'];
const genders = ['Male', 'Female', 'Other'];
const doctors = ['Dr. Rao', 'Dr. Mehta', 'Dr. Iyer', 'Dr. Khan', 'Dr. Fernandes', ''];
const cities = ['Hyderabad', 'Secunderabad', 'Warangal', 'Vijayawada', 'Vishakhapatnam'];

const customers = [];
for (let i = 1; i <= 40; i++) {
  const first = pick(firstNames);
  const last = pick(lastNames);
  customers.push({
    member_id: 'MEM-' + pad(i, 4),
    name: first + ' ' + last,
    gender: pick(genders),
    mobile: '9' + rand(100000000, 999999999),
    email: (first + '.' + last + i).toLowerCase() + '@example.com',
    dob: fmt(addDays(TODAY, -rand(18 * 365, 70 * 365))),
    category: pick(categories),
    d_name: pick(doctors),
    address: rand(1, 200) + ' ' + pick(['MG Road', 'Park Street', 'Station Road', 'Ring Road']) + ', ' + pick(cities),
  });
}

const approvalTypes = ['Purchase Order', 'Vendor Onboarding', 'Budget Increase', 'Asset Write-off', 'Stock Transfer'];
const priorities = ['High', 'Medium', 'Low'];
const approvalStatuses = ['Pending', 'Approved', 'Rejected'];
const requesters = ['Mahendra Kumar Sahu', 'John Smith', 'Sara Lee', 'Mike Chen', 'Linda Ray', 'Tom Davis'];

const approvals = [];
for (let i = 1; i <= 30; i++) {
  approvals.push({
    id: 'REQ-' + pad(i, 4),
    requestedBy: pick(requesters),
    type: pick(approvalTypes),
    date: fmt(addDays(TODAY, -rand(0, 120))),
    priority: pick(priorities),
    status: pick(approvalStatuses),
  });
}

const billingTypes = ['Invoice', 'Receipt', 'Credit note', 'Purchase', 'Service', 'Other'];
const billingStatuses = ['Paid', 'Pending', 'Overdue', 'Cancelled'];
const paymentMethods = ['Cash', 'Card', 'Bank transfer', 'Other'];

const billings = [];
for (let i = 1; i <= 50; i++) {
  const customer = pick(customers);
  const quantity = rand(1, 20);
  const unitPrice = Number((Math.random() * 500 + 10).toFixed(2));
  const taxRate = pick([0, 5, 12, 18]);
  const subtotal = Number((quantity * unitPrice).toFixed(2));
  const taxAmount = Number((subtotal * (taxRate / 100)).toFixed(2));
  const total = Number((subtotal + taxAmount).toFixed(2));
  const issueDate = addDays(TODAY, -rand(0, 90));

  billings.push({
    billNumber: 'BILL-' + pad(i, 4),
    customerName: customer.name,
    customerEmail: customer.email,
    type: pick(billingTypes),
    issueDate: fmt(issueDate),
    dueDate: fmt(addDays(issueDate, 15)),
    status: pick(billingStatuses),
    paymentMethod: pick(paymentMethods),
    description: 'Pharmacy ' + pick(billingTypes).toLowerCase() + ' for ' + customer.name,
    quantity,
    unitPrice,
    taxRate,
    subtotal,
    taxAmount,
    total,
  });
}

customerHandler.create(customers);
approvalsHandler.create(approvals);
billingHandler.create(billings);

console.log('Customer rows now:', customerHandler.count());
console.log('Approvals rows now:', approvalsHandler.count());
console.log('Billing rows now:', billingHandler.count());
