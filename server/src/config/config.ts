export const config = () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.PORT) {
    throw new Error("PORT must be defined");
  }
  return {
    JWT_KEY: process.env.JWT_KEY,
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
  };
};
