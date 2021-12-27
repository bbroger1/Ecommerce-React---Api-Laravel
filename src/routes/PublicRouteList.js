import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact.js";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";

const PublicRouteList = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/about', exact: true, name: 'about', component: About },
    { path: '/contact', exact: true, name: 'contact', component: Contact },
    { path: '/login', exact: true, name: 'login', component: Login },
    { path: '/register', exact: true, name: 'register', component: Register },
    //path: '/collections', exact: true, name: 'collections', component: About,
];

export default PublicRouteList;