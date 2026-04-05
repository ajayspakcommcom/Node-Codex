export const sessionContext = {
  subject: "user_42",
  sessionId: "sid_100",
  familyId: "fam_100",
  nowEpochSeconds: 1_775_338_800,
} as const;

export const accessTokenLifetimeSeconds = 300;
export const refreshTokenLifetimeSeconds = 60 * 60 * 24 * 14;
