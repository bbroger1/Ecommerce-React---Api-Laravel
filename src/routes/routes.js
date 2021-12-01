import Dashboard from "../components/admin/Dashboard.js";
import Profile from "../components/admin/Profile.js";
import Category from "../components/admin/category/Category.js";
import ViewCategory from "../components/admin/category/ViewCategory.js";
import EditCategory from "../components/admin/category/EditCategory.js";
import Product from "../components/admin/product/Product.js";
import ViewProduct from "../components/admin/product/ViewProduct.js";
import EditProduct from "../components/admin/product/EditProduct.js"

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    //category
    { path: '/admin/category', exact: true, name: 'ViewCategory', component: ViewCategory },
    { path: '/admin/add-category', exact: true, name: 'Category', component: Category },
    { path: `/admin/edit-category/:id`, exact: true, name: 'EditCategory', component: EditCategory },

    //product
    { path: '/admin/product', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/admin/add-product', exact: true, name: 'Product', component: Product },
    { path: `/admin/edit-product/:id`, exact: true, name: 'EditProduct', component: EditProduct },
];

export default routes;