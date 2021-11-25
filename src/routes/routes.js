import Dashboard from "../components/admin/Dashboard.js";
import Profile from "../components/admin/Profile.js";
import Category from "../components/admin/Category.js";

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/add-category', exact: true, name: 'Category', component: Category },
];

export default routes;