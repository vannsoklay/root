import dotenv from "dotenv";
import mongoose, {ConnectOptions} from "mongoose";

dotenv.config();
export const ConneToDB = async () => {
  const MONGO_URI = process.env.MONGO_URI as string;

  try {
    const connection = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);
    console.log(`Database Connected: ${connection.connection.host}`);

  } catch (e) {
    setTimeout(ConneToDB, 5000);
  }

};
