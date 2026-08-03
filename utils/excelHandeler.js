const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

/**
 * ExcelHandler — CRUD operations on .xlsx / .xls files via SheetJS.
 *
 * Usage:
 *   const handler = new ExcelHandler("data.xlsx");
 *   handler.create([{ name: "Alice", age: 30 }]);
 *   const rows = handler.read();
 *   handler.update(0, { name: "Bob" });
 *   handler.delete(0);
 */
class ExcelHandler {
  constructor(filePath, sheetName = "Sheet1") {
    this.filePath = path.resolve(filePath);
    this.sheetName = sheetName;
  }

  // ── Internal helpers ───────────────────────────────────────────────────────

  _loadWorkbook() {
    if (!fs.existsSync(this.filePath)) {
      return xlsx.utils.book_new();
    }
    return xlsx.readFile(this.filePath);
  }

  _getSheet(wb) {
    return wb.Sheets[this.sheetName] || null;
  }

  _getRows(wb) {
    const sheet = this._getSheet(wb);
    if (!sheet) return [];
    return xlsx.utils.sheet_to_json(sheet, { defval: "" });
  }

  _saveRows(rows) {
    const wb = this._loadWorkbook();
    const ws = xlsx.utils.json_to_sheet(rows);
    if (wb.SheetNames.includes(this.sheetName)) {
      wb.Sheets[this.sheetName] = ws;
    } else {
      xlsx.utils.book_append_sheet(wb, ws, this.sheetName);
    }
    xlsx.writeFile(wb, this.filePath);
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────

  /**
   * Append one or more rows to the sheet.
   * @param {Object|Object[]} newRows - a single row object or array of row objects
   * @returns {Object[]} the full updated dataset
   */
  create(newRows) {
    const rows = this.read();
    const toAdd = Array.isArray(newRows) ? newRows : [newRows];
    const updated = [...rows, ...toAdd];
    this._saveRows(updated);
    return updated;
  }

  // ── READ ───────────────────────────────────────────────────────────────────

  /**
   * Read all rows from the sheet.
   * @param {Object} [filter] - optional key/value pairs to filter rows
   * @returns {Object[]}
   */
  read(filter = null) {
    const wb = this._loadWorkbook();
    const rows = this._getRows(wb);
    if (!filter) return rows;

    return rows.filter((row) =>
      Object.entries(filter).every(([k, v]) => row[k] === v)
    );
  }

  /**
   * Read a single row by 0-based index.
   * @param {number} index
   * @returns {Object|null}
   */
  readByIndex(index) {
    const rows = this.read();
    return rows[index] ?? null;
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────

  /**
   * Update a row by 0-based index (merges fields).
   * @param {number} index
   * @param {Object} updates - fields to overwrite
   * @returns {Object[]} the full updated dataset
   * @throws {RangeError} if index is out of bounds
   */
  update(index, updates) {
    const rows = this.read();
    if (index < 0 || index >= rows.length) {
      throw new RangeError(`Row index ${index} is out of bounds (total: ${rows.length})`);
    }
    rows[index] = { ...rows[index], ...updates };
    this._saveRows(rows);
    return rows;
  }

  /**
   * Update all rows matching a filter (merges fields).
   * @param {Object} filter - key/value pairs to match
   * @param {Object} updates - fields to overwrite
   * @returns {number} count of rows updated
   */
  updateWhere(filter, updates) {
    const rows = this.read();
    let count = 0;
    const updated = rows.map((row) => {
      const matches = Object.entries(filter).every(([k, v]) => row[k] === v);
      if (matches) {
        count++;
        return { ...row, ...updates };
      }
      return row;
    });
    this._saveRows(updated);
    return count;
  }

  // ── DELETE ─────────────────────────────────────────────────────────────────

  /**
   * Delete a row by 0-based index.
   * @param {number} index
   * @returns {Object[]} the full updated dataset
   * @throws {RangeError} if index is out of bounds
   */
  delete(index) {
    const rows = this.read();
    if (index < 0 || index >= rows.length) {
      throw new RangeError(`Row index ${index} is out of bounds (total: ${rows.length})`);
    }
    rows.splice(index, 1);
    this._saveRows(rows);
    return rows;
  }

  /**
   * Delete all rows matching a filter.
   * @param {Object} filter - key/value pairs to match
   * @returns {number} count of rows deleted
   */
  deleteWhere(filter) {
    const rows = this.read();
    const before = rows.length;
    const remaining = rows.filter(
      (row) => !Object.entries(filter).every(([k, v]) => row[k] === v)
    );
    this._saveRows(remaining);
    return before - remaining.length;
  }

  // ── UTILITIES ──────────────────────────────────────────────────────────────

  /**
   * Wipe all rows from the sheet (keeps the file).
   */
  clear() {
    this._saveRows([]);
  }

  /**
   * Return the number of data rows (excluding header).
   * @returns {number}
   */
  count() {
    return this.read().length;
  }

  /**
   * List all sheet names in the workbook.
   * @returns {string[]}
   */
  listSheets() {
    if (!fs.existsSync(this.filePath)) return [];
    return this._loadWorkbook().SheetNames;
  }
}

module.exports = ExcelHandler;
