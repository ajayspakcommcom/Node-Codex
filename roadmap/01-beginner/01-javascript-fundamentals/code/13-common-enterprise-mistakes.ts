type DemoUser = {
  id: string;
  status: "active" | "locked";
};

type PageSizeInput = {
  pageSize?: number;
};

function mutateSharedUser(user: DemoUser): DemoUser {
  user.status = "locked";
  return user;
}

function safelyLockUser(user: DemoUser): DemoUser {
  return {
    ...user,
    status: "locked",
  };
}

function looseTruthinessCheck(input: PageSizeInput): number {
  if (!input.pageSize) {
    return 25;
  }

  return input.pageSize;
}

function strictPageSizeCheck(input: PageSizeInput): number {
  return input.pageSize ?? 25;
}

const user: DemoUser = {
  id: "usr_9",
  status: "active",
};

console.log("Mutating example:", mutateSharedUser({ ...user }));
console.log("Immutable example:", safelyLockUser(user));
console.log("Original user remains:", user);
console.log("Loose check with zero:", looseTruthinessCheck({ pageSize: 0 }));
console.log("Strict check with zero:", strictPageSizeCheck({ pageSize: 0 }));
