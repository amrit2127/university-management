import About from "../containers/about/About";
import Department from "../containers/admin/department/Department";
import Product from "../containers/admin/product/Product";
import University from "../containers/admin/university/University";
import Contact from "../containers/contact/Contact";
import Login from "../containers/login/Login";
import Register from "../containers/register/Register";
import Support from "../containers/support/Support";
import Cart from "../containers/user/cart/Cart";
import Home from "../containers/user/home/Home";
import ProductDetail from "../containers/user/productDetail/ProductDetail";
import UserDepartment from "../containers/user/userDepartment/UserDepartment";
import UserProduct from "../containers/user/userProduct/UserProduct";
import Checkout from "../containers/user/cart/Checkout";

const ROUTES={
    contact:{
        name:"/contact",
        component:<Contact/>
    },
    about:{
        name:"/about",
        component:<About/>
    },
    login:{
        name:"/login",
        component:<Login/>
    },
    support:{
        name:"/support",
        component:<Support/>
    },
    register:{
        name:"/register",
        component:<Register/>
    },
    universityAdmin:{
        name:"/universityAdmin",
        component:<University/>
    },
    departmentAdmin:{
        name:"/departmentAdmin",
        component:<Department/>
    },
    productAdmin:{
        name:"/productAdmin",
        component:<Product/>
    },
    home:{
        name:"/",
        component:<Home/>
    },
    department:{
        name:"/department",
        component:<UserDepartment/>
    },
    product:{
        name:"/product",
        component:<UserProduct/>
    },
    productDetail:{
        name:"/productDetail",
        component:<ProductDetail/>
    },
    cart:{
        name:"/cart",
        component:<Cart/>
    },
    checkout:{
        name:"/checkout",
        component:<Checkout/>
      }
    
};

export default ROUTES;
