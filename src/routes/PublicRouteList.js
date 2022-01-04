import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact.js";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Collection from "../components/frontend/collections/Collection";
import CollectionProduct from "../components/frontend/collections/CollectionProduct";
import ProductDetail from "../components/frontend/collections/ProductDetail";
import Cart from "../components/frontend/Cart";

const PublicRouteList = [
    { path: '/', exact: true, name: 'home', component: Home },
    { path: '/about', exact: true, name: 'about', component: About },
    { path: '/contact', exact: true, name: 'contact', component: Contact },
    { path: '/login', exact: true, name: 'login', component: Login },
    { path: '/register', exact: true, name: 'register', component: Register },
    { path: '/collection', exact: true, name: 'collection', component: Collection },
    { path: '/collection/:slug', exact: true, name: 'collectionProduct', component: CollectionProduct },
    { path: '/collection/:category/:product', exact: true, name: 'productDetail', component: ProductDetail },
    { path: '/cart', exact: true, name: 'cart', component: Cart },
];

export default PublicRouteList;