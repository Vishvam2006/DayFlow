import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async() => {
    await connectToDatabase();
    try{
        const hashPassword = await bcrypt.hash("employee", 10);
        const newUser = new User({
            name : "Employee2",
            email : "employee2@gmail.com",
            password : hashPassword,
            role : "employee",
        })
        await newUser.save();
    }
    catch(error){
        console.log(error);
    }
}

userRegister();