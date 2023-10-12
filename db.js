const mongoose = require("mongoose");
function connectDB() {
  mongoose.connect(
    "mongodb+srv://sb38617214:YcgSnih0hLp9TnXZ@cluster0.rwdpbm0.mongodb.net/carrental",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("mongodb connection sucesfull");
  });
  connection.on("error", () => {
    console.log("MongoDB connected error"); 
  });
}
connectDB();
module.export = mongoose;
