import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import express from "express";
import { CreateUniversity, DeleteUniversity, GetUniversities, UpdateUniversity } from "./controllers/University.js";
import { CreateDepartment, DeleteDepartment, GetDepartmentByUniversityId, UpdateDepartment } from "./controllers/Department.js";
import { CreateProduct, DeleteProduct, GetProductsByDepartmentId, ProductDetails, UpdateProduct, UpdateProductQty } from "./controllers/Product.js";
import { Login, Register } from "./controllers/user.js";
import { GetCartItems, addToCart, calculateCartTotal } from "./controllers/ShoppingCart.js";
dotenv.config();

var app=express();
app.use(express.json());
app.use(cors());

//University Model
const storageUniv=multer.diskStorage({
    destination:"uploadUniv/",
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const uploadUniv=multer({
    storage:storageUniv,
});


app.post("/university",uploadUniv.single("image"),CreateUniversity);
app.put("/university",uploadUniv.single("image"),UpdateUniversity);
app.delete("/university",DeleteUniversity);
app.get("/university",GetUniversities);


//Department Module
const storageDep=multer.diskStorage({
    destination:"uploadDep/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    }
});

const uploadDep=multer({
    storage:storageDep,
});

app.post("/department",uploadDep.single("image"),CreateDepartment);
app.put("/department",uploadDep.single("image"),UpdateDepartment);
app.delete("/department",DeleteDepartment);
app.get("/department",GetDepartmentByUniversityId);


//Product Model
const storageProduct=multer.diskStorage({
    destination:"uploadProduct/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadProduct=multer({
    storage:storageProduct,
});

app.post("/product",uploadProduct.array("images"),CreateProduct);
app.put("/product",uploadProduct.array("images"),UpdateProduct);
app.delete("/product",DeleteProduct);
app.get("/product",GetProductsByDepartmentId);
app.get("/productDetails",ProductDetails);
app.put("/updateProductQty",UpdateProductQty);


//User Module
app.post("/register",Register);
app.post("/login",Login);

//Image Access
app.use(express.static("uploadUniv/"));
app.use(express.static("uploadDep/"));
app.use(express.static("uploadProduct/"));


//Shopping Cart Model
// const storageProductCart = multer.diskStorage({
//     destination: "uploadProductsInCart/",
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}--${file.originalname}`);
//     },
//   });
//   const uploadProductsInCart = multer({
//     storage: storageProductCart,
//   });

//Cart Module
app.post("/shoppingCart", addToCart);
app.get("/shoppingCart", GetCartItems);
app.put("/shoppingCart",calculateCartTotal);


mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,()=>{
        console.log("Server running at PORT:" + process.env.PORT);
    });
}).catch((e)=>{
    console.log("Database Connection Error");
});