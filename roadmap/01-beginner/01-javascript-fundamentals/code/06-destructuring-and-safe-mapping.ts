type UserProfile = {
  firstName?: string;
  lastName?: string;
};

type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  profile?: UserProfile;
  role: string;
};

type UserResponse = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

function mapUserRecordToResponse(userRecord: UserRecord): UserResponse {
  const {
    id,
    email,
    profile: { firstName, lastName } = {},
    role,
  } = userRecord;

  return {
    id,
    email,
    fullName: [firstName, lastName].filter(Boolean).join(" "),
    role,
  };
}

const dbRecord: UserRecord = {
  id: "usr_501",
  email: "engineer@example.com",
  passwordHash: "hidden",
  profile: {
    firstName: "Node",
    lastName: "Engineer",
  },
  role: "admin",
};

console.log(mapUserRecordToResponse(dbRecord));
