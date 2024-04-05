import UserModel from "../models/User.js"

export const Register=async(req,res)=>{
    try {
        let user=await UserModel.findOne({
            email:req.body.email
        });
        if(user) {res.status(404).send({message:"USer already created with thsi email"});
        return;
    }
    let userInfo=await UserModel.create({
        ...req.body,
        profilePic:req?.file?.filename,
    });

    if(userInfo) res.status(201).send({message:"User Created"});
    else res.status(404).send({message:"Unable to create User"});
    
    } catch (e) {
        res.status(404).send({error:e?.message});
    }
};

export const Login=async(req,res)=>{
    try {
        let user=await UserModel.findOne({email:req.body.email,
        password:req.body.password
    });
    if(user) res.status(200).send({id:user._id,role:user.role});
    else res.status(404).send({message:"Wrong User/Password"});

    } catch (e) {
        res.status(404).send({error:e?.message});
    }
};


