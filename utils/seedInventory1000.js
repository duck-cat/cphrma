const path = require('path');
const ExcelHandler = require('./excelHandeler');

const inventoryHandler = new ExcelHandler(path.join(__dirname, '../files/inventory.xlsx'), 'Inventory');

function pad(n, w) { return String(n).padStart(w, '0'); }
function fmt(d) { return d.toISOString().slice(0, 10); }
function addDays(d, days) { const r = new Date(d); r.setDate(r.getDate() + days); return r; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }

const TODAY = new Date('2026-11-14');

const medicines = [
  { name: 'Paracetamol', forms: ['500mg Tablet', '650mg Tablet', '125mg Syrup'], hsn: '30049099', desc: 'Pain relief and fever reduction' },
  { name: 'Amoxicillin', forms: ['250mg Capsule', '500mg Capsule'], hsn: '30042010', desc: 'Antibiotic for bacterial infections' },
  { name: 'Azithromycin', forms: ['250mg Tablet', '500mg Tablet'], hsn: '30042010', desc: 'Antibiotic tablet for bacterial infections' },
  { name: 'Ibuprofen', forms: ['200mg Tablet', '400mg Tablet'], hsn: '30049099', desc: 'Anti-inflammatory and pain relief tablet' },
  { name: 'Cetirizine', forms: ['10mg Tablet'], hsn: '30049099', desc: 'Antihistamine for allergy relief' },
  { name: 'Metformin', forms: ['500mg Tablet', '1000mg Tablet'], hsn: '30049099', desc: 'Oral medication for type 2 diabetes' },
  { name: 'Insulin Glargine', forms: ['100IU Injection'], hsn: '30043100', desc: 'Long-acting insulin for diabetes management' },
  { name: 'Amlodipine', forms: ['5mg Tablet', '10mg Tablet'], hsn: '30049099', desc: 'Calcium channel blocker for hypertension' },
  { name: 'Atorvastatin', forms: ['10mg Tablet', '20mg Tablet'], hsn: '30049099', desc: 'Lowers cholesterol levels' },
  { name: 'Omeprazole', forms: ['20mg Capsule'], hsn: '30049099', desc: 'Reduces stomach acid production' },
  { name: 'Pantoprazole', forms: ['40mg Tablet'], hsn: '30049099', desc: 'Proton pump inhibitor for acid reflux' },
  { name: 'Ranitidine', forms: ['150mg Tablet'], hsn: '30049099', desc: 'Reduces stomach acid' },
  { name: 'Ciprofloxacin', forms: ['500mg Tablet'], hsn: '30042010', desc: 'Broad spectrum antibiotic' },
  { name: 'Doxycycline', forms: ['100mg Capsule'], hsn: '30042010', desc: 'Antibiotic for bacterial infections' },
  { name: 'Salbutamol', forms: ['Inhaler 100mcg', '2mg Tablet'], hsn: '30049099', desc: 'Bronchodilator for asthma' },
  { name: 'Montelukast', forms: ['10mg Tablet'], hsn: '30049099', desc: 'Leukotriene receptor antagonist for asthma' },
  { name: 'Diclofenac', forms: ['50mg Tablet', 'Gel 30g'], hsn: '30049099', desc: 'Nonsteroidal anti-inflammatory drug' },
  { name: 'Aspirin', forms: ['75mg Tablet', '150mg Tablet'], hsn: '30049099', desc: 'Blood thinner and pain reliever' },
  { name: 'Clopidogrel', forms: ['75mg Tablet'], hsn: '30049099', desc: 'Antiplatelet medication' },
  { name: 'Levothyroxine', forms: ['50mcg Tablet', '100mcg Tablet'], hsn: '30049099', desc: 'Thyroid hormone replacement' },
  { name: 'Prednisolone', forms: ['5mg Tablet'], hsn: '30049099', desc: 'Corticosteroid for inflammation' },
  { name: 'Hydrocortisone', forms: ['Cream 15g'], hsn: '30049099', desc: 'Topical corticosteroid' },
  { name: 'Vitamin D3', forms: ['60000IU Sachet'], hsn: '30049011', desc: 'Vitamin D3 supplement' },
  { name: 'Vitamin B Complex', forms: ['Tablet'], hsn: '30049011', desc: 'B-complex vitamin supplement' },
  { name: 'Iron Folic Acid', forms: ['Tablet'], hsn: '30049011', desc: 'Iron and folic acid supplement' },
  { name: 'ORS Powder', forms: ['Sachet 21g'], hsn: '30049011', desc: 'Oral rehydration salts' },
  { name: 'Normal Saline', forms: ['500ml IV Fluid', '1000ml IV Fluid'], hsn: '30049099', desc: 'Intravenous fluid for hydration' },
  { name: 'Dextrose', forms: ['5% 500ml IV Fluid'], hsn: '30049099', desc: 'Intravenous glucose solution' },
  { name: 'Ringer Lactate', forms: ['500ml IV Fluid'], hsn: '30049099', desc: 'IV fluid for fluid resuscitation' },
  { name: 'Metronidazole', forms: ['400mg Tablet'], hsn: '30042010', desc: 'Antibiotic for anaerobic infections' },
  { name: 'Cefixime', forms: ['200mg Tablet'], hsn: '30042010', desc: 'Cephalosporin antibiotic' },
  { name: 'Loratadine', forms: ['10mg Tablet'], hsn: '30049099', desc: 'Non-drowsy antihistamine' },
  { name: 'Domperidone', forms: ['10mg Tablet'], hsn: '30049099', desc: 'Treats nausea and vomiting' },
  { name: 'Ondansetron', forms: ['4mg Tablet', 'Injection 2ml'], hsn: '30049099', desc: 'Anti-emetic for nausea' },
  { name: 'Tramadol', forms: ['50mg Capsule'], hsn: '30049099', desc: 'Opioid pain reliever' },
  { name: 'Morphine Sulphate', forms: ['10mg Injection'], hsn: '30049099', desc: 'Strong opioid analgesic' },
  { name: 'Heparin', forms: ['5000IU Injection'], hsn: '30043900', desc: 'Anticoagulant injection' },
  { name: 'Warfarin', forms: ['5mg Tablet'], hsn: '30049099', desc: 'Oral anticoagulant' },
  { name: 'Furosemide', forms: ['40mg Tablet'], hsn: '30049099', desc: 'Loop diuretic' },
  { name: 'Spironolactone', forms: ['25mg Tablet'], hsn: '30049099', desc: 'Potassium-sparing diuretic' },
  { name: 'Surgical Gloves', forms: ['Small', 'Medium', 'Large'], hsn: '40151200', desc: 'Latex-free disposable surgical gloves' },
  { name: 'Face Mask', forms: ['3-ply', 'N95'], hsn: '63079090', desc: 'Protective face mask' },
  { name: 'Syringe', forms: ['5ml', '10ml'], hsn: '90183100', desc: 'Disposable syringe' },
  { name: 'IV Cannula', forms: ['18G', '20G', '22G'], hsn: '90183900', desc: 'Intravenous cannula' },
  { name: 'Cotton Bandage', forms: ['Roll 6cm'], hsn: '30059090', desc: 'Sterile cotton bandage roll' },
  { name: 'Digital BP Monitor', forms: ['Standard'], hsn: '90189099', desc: 'Automatic digital blood pressure monitor' },
  { name: 'Digital Thermometer', forms: ['Standard'], hsn: '90189099', desc: 'Digital clinical thermometer' },
  { name: 'Pulse Oximeter', forms: ['Fingertip'], hsn: '90189099', desc: 'Measures blood oxygen saturation' },
  { name: 'Nebulizer Machine', forms: ['Compressor'], hsn: '90189099', desc: 'Respiratory nebulizer device' },
  { name: 'Glucometer', forms: ['Standard Kit'], hsn: '90189099', desc: 'Blood glucose monitoring device' },
];

const suppliers = [
  { name: 'MedSupply Co.', details: '123 Pharma Street, Mumbai | +91-9000000001 | medsupply@example.com' },
  { name: 'PharmaCure Ltd.', details: '45 Health Avenue, Delhi | +91-9000000002 | pharmacure@example.com' },
  { name: 'BioGen Pharma', details: '78 BioTech Park, Hyderabad | +91-9000000003 | biogen@example.com' },
  { name: 'SafeHands Inc.', details: '22 Industrial Zone, Chennai | +91-9000000004 | safehands@example.com' },
  { name: 'Apex Pharma Distributors', details: '12 MG Road, Bangalore | 9123456780 | apex.pharma@example.com' },
  { name: 'Sunrise Healthcare Supplies', details: '45 Anna Salai, Chennai | 9988776655 | sunrise.health@example.com' },
  { name: 'Trimurti Medline Pvt Ltd', details: '7 Industrial Area, Pune | 9876501234 | trimurti.medline@example.com' },
  { name: 'Greenleaf Surgicals', details: '18 Park Street, Kolkata | 9090909090 | greenleaf.surgicals@example.com' },
  { name: 'Nova Life Sciences', details: '3 Sector 21, Gurugram | 9811122233 | nova.lifesciences@example.com' },
];

const locations = [];
['A', 'B', 'C', 'D'].forEach((w) => {
  for (let s = 1; s <= 10; s++) locations.push('Warehouse ' + w + ' - Shelf ' + s);
});
locations.push('Cold Storage - Unit 1', 'Cold Storage - Unit 2');

const records = [];
for (let i = 1; i <= 1000; i++) {
  const med = pick(medicines);
  const form = pick(med.forms);
  const supplier = pick(suppliers);
  const bucket = rand(1, 100);

  let mfgDate, expiryDate, purchaseDate;
  if (bucket <= 25) {
    // already expired: expiry 1-400 days in the past
    expiryDate = addDays(TODAY, -rand(1, 400));
    mfgDate = addDays(expiryDate, -rand(365, 900));
    purchaseDate = addDays(mfgDate, rand(10, 60));
  } else if (bucket <= 45) {
    // about to expire: within next 60 days
    expiryDate = addDays(TODAY, rand(1, 60));
    mfgDate = addDays(expiryDate, -rand(365, 900));
    purchaseDate = addDays(mfgDate, rand(10, 60));
  } else {
    // safe: expiry well in the future
    expiryDate = addDays(TODAY, rand(100, 1000));
    mfgDate = addDays(TODAY, -rand(1, 300));
    purchaseDate = addDays(mfgDate, rand(5, 60));
  }

  records.push({
    hsn_number: med.hsn,
    batch_number: 'BATCH-' + mfgDate.getFullYear() + '-' + pad(i, 4),
    item_name: med.name + ' ' + form,
    item_description: med.desc,
    quantity: rand(10, 2500),
    mfg_date: fmt(mfgDate),
    expiry_date: fmt(expiryDate),
    purchage_date: fmt(purchaseDate),
    location: pick(locations),
    supplier_name: supplier.name,
    supplier_details: supplier.details,
    price: Number((Math.random() * 1500 + 2).toFixed(2)),
  });
}

inventoryHandler.create(records);
console.log('Inventory rows now:', inventoryHandler.count());

const all = inventoryHandler.read();
const todayStr = fmt(TODAY);
const expired = all.filter((r) => r.expiry_date && String(r.expiry_date).slice(0, 10) < todayStr).length;
const soon = all.filter((r) => {
  const e = String(r.expiry_date).slice(0, 10);
  if (!e) return false;
  const diff = (new Date(e) - TODAY) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 60;
}).length;
console.log('Expired rows (approx):', expired);
console.log('About-to-expire rows (<=60 days, approx):', soon);
