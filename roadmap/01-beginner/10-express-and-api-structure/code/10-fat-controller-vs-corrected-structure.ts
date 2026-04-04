console.log("Bad fat controller pattern:");
console.log("- parse request");
console.log("- validate input");
console.log("- run business rules");
console.log("- call database directly");
console.log("- shape success and error responses inline");

console.log("Corrected enterprise structure:");
console.log("- middleware handles request concerns");
console.log("- validation happens at boundary");
console.log("- controller stays thin");
console.log("- service owns business rules");
console.log("- repository owns persistence");
console.log("- error middleware centralizes failure formatting");
