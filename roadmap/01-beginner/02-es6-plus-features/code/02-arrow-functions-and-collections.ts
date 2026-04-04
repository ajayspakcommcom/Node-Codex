interface Invoice {
  readonly id: string;
  readonly amount: number;
  readonly status: "paid" | "pending";
}

const invoices: readonly Invoice[] = [
  { id: "inv_1", amount: 300, status: "paid" },
  { id: "inv_2", amount: 120, status: "pending" },
  { id: "inv_3", amount: 450, status: "paid" },
];

const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");
const paidInvoiceIds = paidInvoices.map((invoice) => invoice.id);
const totalPaid = paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

console.log({
  paidInvoiceIds,
  totalPaid,
});
