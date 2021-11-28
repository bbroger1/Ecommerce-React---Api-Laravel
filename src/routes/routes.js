import Dashboard from "../components/admin/Dashboard.js";
import Profile from "../components/admin/Profile.js";
import Category from "../components/admin/category/Category.js";
import ViewCategory from "../components/admin/category/ViewCategory.js"
import EditCategory from "../components/admin/category/EditCategory.js"

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/category', exact: true, name: 'ViewCategory', component: ViewCategory },
    { path: '/admin/add-category', exact: true, name: 'Category', component: Category },
    { path: `/admin/edit-category/:id`, exact: true, name: 'EditCategory', component: EditCategory },
];

export default routes;