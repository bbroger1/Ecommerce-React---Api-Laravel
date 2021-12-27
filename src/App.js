import React from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PublicRoute from "./PublicRoute";

import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import AdminPrivateRoute from "./AdminPrivateRoute";

axios.defaults.baseURL = "http://ecommerce_react.test";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use(function (config) {
	const token = localStorage.getItem('auth_token');
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
})
axios.defaults.withCredentials = true;

function App() {
	return (
		<BrowserRouter>
			<Switch>
				{/*<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/contact" component={Contact} />*/}

				<AdminPrivateRoute path="/admin" name="Admin" />

				<PublicRoute path="/" name="Home" />

				<Route path="/login">
					{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
				</Route>

				<Route path="/register">
					{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
				</Route>

			</Switch>
		</BrowserRouter>
	);
}

export default App;
