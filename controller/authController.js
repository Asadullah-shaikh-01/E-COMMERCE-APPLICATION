import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import Jwt from "jsonwebtoken";


export const registerController = async (req, res) => {
  try {
    const { Name, Email, Password, Phone, Address ,Answer} = req.body;
    //validations
    if (!Name) {
      return res.send({ message: "Name is Required" });
    }
    if (!Email) {
      return res.send({ message: "Email is Required" });
    }
    if (!Password) {
      return res.send({ message: "Password is Required" });
    }
    if (!Phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!Address) {
      return res.send({ message: "Address is Required" });
    }
    if (!Answer) {
      return res.send({ message: "Answer is Required" });
    }
    // Checking User
    const exisitingUser = await userModel.findOne({ Email });
    // existing User
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "User already Register please Login",
      });
    }

    // Register
    const hashedPassword = await hashPassword(Password);
    //save
    const User = await new userModel({
      Name,
      Email,
      Phone,
      Address,
      Answer,
      Password: hashedPassword,
    

    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Succesfully",
      User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registions",
      error,
    });
  }
};

// Post LOGIN

export const loginController = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    //Validations
    if (!Email || !Password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email Or Password",
      });
    }
    //check User
    const user = await userModel.findOne({ Email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await comparePassword(Password, user.Password);
    if (!match) {
      return res.status(202).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // Token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login Succesfully",
      user: {
        Name: user.Name,
        Email: user.Email,
        Phone: user.Phone,
        Address: user.Address,
        Role: user.Role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


// froget Password Controller
export const forgotPasswordController = async (req,res)=>{
 
try {
  const {Email,Answer,newPassword} =req.body
  if (!Email) {
    res.status(400).send({message:"email is required"});
  }
  if (!Answer) {
    res.status(400).send({message:"Answer is required"});
  }
  if (!newPassword) {
    res.status(400).send({message:"new passwoed is required"});
  }
  // check 
  const user =await userModel.findOne({Email,Answer})
  // validation
if (!user) {
  return res.status(404).send({
    success:false,
    message:'wrong Email id or Answer',

  })
}
  const hashed = await  hashPassword(newPassword);
  await userModel.findByIdAndUpdate(user._id,{Password:hashed});
  res.status(200).send({
    success:true,
    message:'Password Reset Successfully',

    
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success:false,
    message:"Something is wrong",
    error
  })
}
};






// Test testController
export const testController = (req, res) => {
  res.send("Protect Route");
};



//update profiles
export const updateProfileController = async (req, res) => {
  try {
    const { Name, Email, Password, Address, Phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //Password
    if (Password && Password.length < 8) {
      return res.json({ error: "Passsword is required and 8 character long" });
    }
    const hashedPassword = Password ? await hashPassword(Password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        Name: Name || user.Name,
        Password: hashedPassword || user.Password,
        Phone: Phone || user.Phone,
        Address: Address || user.Address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};