import ProductModel from "../models/Product.js";

export const CreateProduct=async(req,res)=>{
    try{
        let images=req?.files?.map((item)=>{
            return item.filename;
        });
        const productData=await ProductModel.create({
            name:req.body.name,
            description:req.body.description,
            qty:req.body.qty,
            price:req.body.price,
            images:images,
            department:req.body.departmentId,
        });
        if(productData) res.status(201).send({message:"Product Created!!!"});
        else res.status(404).send({message:"Unable to create Product"});
    }  catch(e) {
        res.status(404).send({error:e?.message});
    }
};

export const UpdateProduct=async(req,res)=>{
    try{
        let images=req?.files?.map((item)=>{
            return item.filename;
        });
        const productData=await ProductModel.findByIdAndUpdate({
            _id:req.body.id},
            {
                name:req.body.name,
                description:req.body.description,
                qty:req.body.qty,
                price:req.body.price,
                images:images,
                department:req.body.departmentId,
            }
        );
        if(productData) res.status(201).send({message:"Product Updated!!!"});
        else res.status(404).send({message:"Unable to update Product!!"});
    }
    catch(e){
        res.status(404).send({error:e?.message});
    }
};


export const DeleteProduct=async(req,res)=>{
    try{
        const productData=await ProductModel.deleteOne({
            _id:req.body.id});
        if(productData.deletedCount==1) res.status(200).send({message:"Product Deleted"});
        else res.status(404).send({message:"Unable to delete Product!!"});
    }
    catch(e){
        res.status(404).send({error:e?.message});
    }
};

export const ProductDetails=async(req,res)=>{
    try{
        const productData=await ProductModel.findOne({
            _id:req.query.id}).populate({path:"department",populate:[{path:"university"}]});
            res.status(200).send({productData});
    }
    catch(e){
        res.status(404).send({error:e?.message});
    }
};

export const GetProductsByDepartmentId=async(req,res)=>{
    try{
        const productData=await ProductModel.find({
            department:req.query.departmentId,
        }).populate({path:"department",populate:[{path:"university"}],});
        res.status(200).send({productData});
    }catch(e){
        res.status(404).send({error:e?.message});
    }
};

export const UpdateProductQty=async(res,req)=>{
    try{
        let productInDb=await ProductModel.findOne({
            _id:req.body.id
        });
        let active=true;
        if(productInDb.qty-req?.body?.qty<=0)
        {
            active=false;
        }
        let productData=await ProductModel.findByIdAndUpdate({_id:req.body.id},
            {
                active:active,
                qty:productInDb?.qty-req.body.qty,
            });
            if(productData) res.status(200).send({message:"Product qty Updated"});
            else res.status(404).send({message:"Unable to update product qty"});
    }
    catch(e){
            res.status(404).send({error:e?.message});
    }
};