"use strict";
// =======================================================
// 🛠️ EXERCISE: PRODUCT CLASS
// =======================================================
// Follow each step and fill in the code where marked
// Test your work by running the test section at the bottom
// =======================================================

// ✅ STEP 1: Create a custom ValidationError class
// - It should extend Error
// - In constructor, call super(message) and set this.name = "ValidationError"
// ✏️ YOUR CODE HERE

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// ✅ STEP 2: Create a Product class
// Requirements:
// - Private field: #price
// - constructor(name, price, manufacturedDate)
//     → call Product.validateName(name)
//     → set price using setter
//     → store manufacturedDate
// - getter and setter for price
//     → setter must throw ValidationError if price < 0
// - getInfo(): return "<name> costs $<price>"
// - applyDiscount(percent): subtract discount using Math.floor
// - getAge(): return days old since manufacturedDate
// - static validateName(name): throw ValidationError if name is empty or shorter than 2 characters
// ✏️ YOUR CODE HERE

class Product {
  #price;

  constructor(name, price, manufacturedDate) {
    Product.validateName(name);
    this.name = name;
    this.price = price; // use setter
    this.manufacturedDate = manufacturedDate;
  }

  // getter & setter for price
  get price() {
    return this.#price;
  }
  set price(value) {
    if (value < 0) throw new ValidationError("Price cannot be negative");
    this.#price = value;
  }

  getInfo() {
    return `${this.name} costs $${this.#price}`;
  }

  applyDiscount(percent) {
    const discount = Math.floor((this.#price * percent) / 100);
    this.#price -= discount;
  }

  getAge() {
    const days = Math.floor(
      (Date.now() - this.manufacturedDate) / (1000 * 60 * 60 * 24)
    );
    return days;
  }

  static validateName(name) {
    if (!name || name.length < 2) {
      throw new ValidationError("Name must be at least 2 characters");
    }
  }
}

// ✅ STEP 3: Create subclasses LandProduct and SeaProduct
// - both extend Product
// - override getInfo() to prefix "[Land]" or "[Sea]" before the parent's getInfo()
// ✏️ YOUR CODE HERE
class LandProduct extends Product {
  getInfo() {
    return `[Land] ${this.name} costs $${this.price}`;
  }
}
class SeaProduct extends Product {
  getInfo() {
    return `[Sea] ${this.name} costs $${this.price}`;
  }
}

// ===============================
// ✅ BONUS (Optional)
// - Create DigitalProduct extends Product
//   → override getInfo() with "[Digital]" prefix
//   → override getAge() to log "Not applicable" and return null
// ===============================

class DigitalProduct extends Product {
  getInfo() {
    return `[Digital] ${this.name} costs $${this.price}`;
  }

  getAge() {
    console.log("Not applicable for digital products.");
    return null;
  }
}

// ✅ STEP 4: Test your code
// After you finish implementing, uncomment the code below and run to see if it works.

try {
  console.log("=== LandProduct ===");
  const apple = new LandProduct("Apple", 100, new Date(2025, 6, 1));
  console.log(apple.getInfo()); // [Land] Apple costs $100
  apple.applyDiscount(10);
  console.log(apple.getInfo()); // [Land] Apple costs $90
  console.log("Days old:", apple.getAge());

  console.log("\n=== SeaProduct ===");
  const tuna = new SeaProduct("Tuna", 200, new Date(2025, 6, 10));
  console.log(tuna.getInfo()); // [Sea] Tuna costs $200
  tuna.applyDiscount(5);
  console.log(tuna.getInfo()); // [Sea] Tuna costs $190

  console.log("\n=== DigitalProduct (BONUS) ===");
  const ebook = new DigitalProduct("E-Book", 50, new Date(2025, 2, 1));
  console.log(ebook.getInfo()); // [Digital] E-Book costs $50
  ebook.applyDiscount(20);
  console.log(ebook.getInfo()); // [Digital] E-Book costs $40
  ebook.getAge(); // logs "Not applicable for digital products."

  console.log("\n=== ValidationError test ===");
  // Uncomment below to test error
  Product.validateName(""); // should throw ValidationError
  
} catch (err) {
  if (err instanceof ValidationError) {
    console.error("Validation failed:", err.message);
  } else {
    console.error("Error:", err.message);
  }
}

// -m "class solution"
