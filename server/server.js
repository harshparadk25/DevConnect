const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const authRoutes = require('./routes/auth');
const app = express();
const userRoutes = require('./routes/user')
const projectRoutes = require('./routes/project')
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB connected Successfully");
}).catch((error)=>{
    console.log(error);
})
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_BASE_URL,
   
    credentials:true,
}))

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use("/api/projects",projectRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(PORT,()=>{
    console.log(`server is working on ${PORT}`);
})