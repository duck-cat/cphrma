const ExcelHandler = require("./excelHandeler");

const handler = new ExcelHandler("inventory.xlsx", "Inventory");

handler.create([
  {
    item_number:      "ITM-001",
    item_name:        "Paracetamol 500mg",
    item_description: "Pain relief and fever reduction tablet",
    quantity:         500,
    mfg_date:         "2025-01-10",
    expiry_date:      "2027-01-10",
    entry_date:       "2025-02-01",
    location:         "Warehouse A - Shelf 3",
    supplier_name:    "MedSupply Co.",
    supplier_details: "123 Pharma Street, Mumbai | +91-9000000001 | medsupply@example.com",
    price:            12.50,
  },
  {
    item_number:      "ITM-002",
    item_name:        "Amoxicillin 250mg",
    item_description: "Antibiotic capsule for bacterial infections",
    quantity:         300,
    mfg_date:         "2025-03-05",
    expiry_date:      "2027-03-05",
    entry_date:       "2025-04-01",
    location:         "Warehouse A - Shelf 7",
    supplier_name:    "PharmaCure Ltd.",
    supplier_details: "45 Health Avenue, Delhi | +91-9000000002 | pharmacure@example.com",
    price:            35.00,
  },
  {
    item_number:      "ITM-003",
    item_name:        "Insulin Glargine 100IU",
    item_description: "Long-acting insulin for diabetes management",
    quantity:         150,
    mfg_date:         "2025-06-01",
    expiry_date:      "2026-06-01",
    entry_date:       "2025-06-15",
    location:         "Cold Storage - Unit 2",
    supplier_name:    "BioGen Pharma",
    supplier_details: "78 BioTech Park, Hyderabad | +91-9000000003 | biogen@example.com",
    price:            850.00,
  },
  {
    item_number:      "ITM-004",
    item_name:        "Surgical Gloves (M)",
    item_description: "Latex-free disposable surgical gloves, medium size",
    quantity:         2000,
    mfg_date:         "2024-11-20",
    expiry_date:      "2029-11-20",
    entry_date:       "2025-01-05",
    location:         "Warehouse B - Shelf 1",
    supplier_name:    "SafeHands Inc.",
    supplier_details: "22 Industrial Zone, Chennai | +91-9000000004 | safehands@example.com",
    price:            3.75,
  },
  {
    item_number:      "ITM-005",
    item_name:        "Ibuprofen 400mg",
    item_description: "Anti-inflammatory and pain relief tablet",
    quantity:         750,
    mfg_date:         "2025-02-18",
    expiry_date:      "2027-02-18",
    entry_date:       "2025-03-01",
    location:         "Warehouse A - Shelf 5",
    supplier_name:    "MedSupply Co.",
    supplier_details: "123 Pharma Street, Mumbai | +91-9000000001 | medsupply@example.com",
    price:            18.00,
  },
]);

console.log("inventory.xlsx created with", handler.count(), "rows.");
console.table(handler.read());
