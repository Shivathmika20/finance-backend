function getJwtSecret(): string {
	const secret = process.env.JWT_SECRET?.trim();
	if (secret) return secret;
	if (process.env.NODE_ENV === "production") {
		throw new Error(
			"JWT_SECRET must be set in production. Generate a strong secret and set the env var.",
		);
	}
	return "fallback_secret_local_demo_only";
}

export const jwt_secret = getJwtSecret();