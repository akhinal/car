const express = require("express");
// const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db')
app.use(express.json())
// app.use(cors())


app.use('/api/cars/',require('./routes/carRoutes'))
app.use('/api/user/',require('./routes/userRoutes'))
app.use('/api/bookings/',require('./routes/bookingRoutes'))

app.get("./", (req, res) => res.send("helloworld!"));
app.listen(port, () => console.log(`Nodejs server started in ${port}`));
