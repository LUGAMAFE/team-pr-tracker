import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Data Base online');
  } catch (e) {
    console.log(e);
    console.log('Error connecting to the database');
  }
};

export default dbConnection;
