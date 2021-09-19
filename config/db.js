import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      }).then(() => console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline))
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    //   1 means to exit with failures
    process.exit(1)
  }
}

export default connectDB
