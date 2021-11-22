import React from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import MasterLayout from "./layouts/admin/MasterLayout";
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";

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
				<Route exact path="/" component={Home} />

				<Route path="/login">
					{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
				</Route>

				<Route path="/register">
					{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
				</Route>

				<Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} />

			</Switch>
		</BrowserRouter>
	);
}

export default App;
