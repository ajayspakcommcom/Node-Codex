type UserStatus = "pending" | "verified";
type UserRole = "member" | "admin";

type User = {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  verifiedAt?: string;
};

type ApiUserResponse = {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

function buildApiResponse(user: User): ApiUserResponse {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

function markUserAsVerified(user: User): User {
  return {
    ...user,
    status: "verified",
    verifiedAt: "2026-04-04T00:00:00.000Z",
  };
}

const originalUser: User = {
  id: "usr_1001",
  email: "user@example.com",
  role: "member",
  status: "pending",
};

const updatedUser = markUserAsVerified(originalUser);

console.log("Original user:", originalUser);
console.log("Updated user:", updatedUser);
console.log("API response:", buildApiResponse(updatedUser));
