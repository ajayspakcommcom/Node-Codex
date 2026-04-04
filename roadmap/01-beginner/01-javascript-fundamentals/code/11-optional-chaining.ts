type Account = {
  id: string;
  profile?: {
    address?: {
      city?: string;
    };
    preferences?: {
      timezone?: string;
    };
  };
  owner?: {
    manager?: {
      email?: string;
    };
  };
};

type AccountSummary = {
  id: string;
  city: string;
  timezone: string;
  managerEmail: string;
};

function buildAccountSummary(account: Account): AccountSummary {
  return {
    id: account.id,
    city: account.profile?.address?.city ?? "unknown",
    timezone: account.profile?.preferences?.timezone ?? "UTC",
    managerEmail: account.owner?.manager?.email ?? "not-assigned",
  };
}

console.log(
  buildAccountSummary({
    id: "acc_77",
    profile: {
      address: { city: "Bengaluru" },
      preferences: { timezone: "Asia/Kolkata" },
    },
    owner: {},
  }),
);
