import { Types } from "mongoose";
import CSVExporter from "./csv-exporter.interface";
import JSONData from "./json-data";

// Adapter: Converts JSON data to CSV
class JSONToCSVAdapter implements CSVExporter {
  private jsonData: JSONData;
  private keysToSkip: string[];

  constructor(jsonData: JSONData, keysToSkip: string[] = []) {
    this.jsonData = jsonData;
    this.keysToSkip = keysToSkip;
  }

   formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad to 2 digits
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad to 2 digits
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad to 2 digits
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad to 2 digits
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get seconds and pad to 2 digits
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

  exportToCSV(): string {
    const data = this.jsonData.getJSON();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid JSON data: Must be a non-empty array of objects.");
    }

    const keys = Object.keys(data[0]).filter((key) => !this.keysToSkip.includes(key));
    const header = keys.join(","); 

    const rows = data.map((row) =>
      keys
        .map((key) => {
            
          const value = row[key];
        if (value=='income') return;
          // Handle Types.ObjectId first
          if (value instanceof Types.ObjectId )
            return value.toString();

          if(value instanceof Date) {
                return this.formatDate(value);
          }

          // Handle generic objects with toString metho d  
          if (value instanceof Object && typeof value.toString === "function") {
            return value.toString();
          }

          // Convert nested objects/arrays to JSON string
          if (typeof value === "object") {
            return JSON.stringify(value);
          }

          // Return other values as is
          return value !== undefined ? value : "";
        })
        .join(",")
    );
    
    return [header, ...rows].join("\n");
  }
}

export default JSONToCSVAdapter;
