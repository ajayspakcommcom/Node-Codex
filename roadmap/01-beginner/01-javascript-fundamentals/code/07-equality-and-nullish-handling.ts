type EmailInput = {
  email?: string | null;
};

type PageQuery = {
  pageSize?: number | null;
};

function validateEmailInput(input: EmailInput): void {
  if (input.email == null || input.email === "") {
    throw new Error("Email is required");
  }
}

function resolvePageSize(query: PageQuery): number {
  return query.pageSize ?? 25;
}

function isAdmin(role: string): boolean {
  return role === "admin";
}

validateEmailInput({ email: "ops@example.com" });

console.log("Page size with explicit zero:", resolvePageSize({ pageSize: 0 }));
console.log("Page size with missing value:", resolvePageSize({}));
console.log("Is admin:", isAdmin("admin"));
