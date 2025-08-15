"use server"
import bcrypt from 'bcrypt'
import dbConnect from "@/lib/dbConnect";

export default async function registerUser(payload) {
    const {name,photo,email,password}=payload
    if(!email||!password)
        return null;
    const usercol=dbConnect("user")
    const result=await usercol.findOne({email:email});
    if(result)
        return null;
    else
    {   const hashedpassword=await bcrypt.hash(password,10)
       const newUser = {
    name,
    image:photo,     // you used `photo` here but in form you used `image`. Make consistent!
    email,
    password: hashedpassword,
  };
        const result=await usercol.insertOne(newUser);
        console.log("result of register",result)
        result.insertedId=result.insertedId.toString()
        return result;
    }
        return null;
 
}
//pages/api/auth/[...nextauth].js