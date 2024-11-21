import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017",
};
