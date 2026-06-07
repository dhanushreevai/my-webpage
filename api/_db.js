import mongoose from "mongoose";

let cached = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const contactSchema = new mongoose.Schema(
  { name: { type: String, required: true }, email: { type: String, required: true }, phone: { type: String, required: true } },
  { timestamps: true }
);

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeFileName: String,
    resumeData: String,
    resumeMimeType: String,
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);
