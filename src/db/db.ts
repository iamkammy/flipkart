import mongoose, { ConnectOptions } from "mongoose";
import { logger } from "../utils/logger";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as ConnectOptions
    );
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};
