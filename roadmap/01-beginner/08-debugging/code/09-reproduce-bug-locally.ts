function calculateDiscountedPrice(price: number, discountPercent: number): number {
  return price - price * (discountPercent / 100);
}

const reproductionInput = {
  price: 1000,
  discountPercent: 150,
};

console.log("Reproduction case:", reproductionInput);
console.log("Observed result:", calculateDiscountedPrice(reproductionInput.price, reproductionInput.discountPercent));
console.log("Why this matters: a reproducible input narrows the bug before code changes");
