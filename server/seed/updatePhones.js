const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "seedProperties.js");
let content = fs.readFileSync(filePath, "utf8");
content = content.replace(/contactPhone:\s*"[^"]+"/g, 'contactPhone: "+91 73853 27808"');
fs.writeFileSync(filePath, content, "utf8");
console.log("Successfully updated all contactPhone entries to +91 73853 27808 in seedProperties.js");
