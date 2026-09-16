import "dotenv/config";

const env = {
    port: process.env.PORT || 5000,
    databaseUrl: process.env.DATABASE_URL,
};

if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is missing");
}

export default env;