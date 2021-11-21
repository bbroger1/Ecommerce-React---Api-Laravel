import React from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MasterLayout from "./layouts/admin/MasterLayout";
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";

axios.defaults.baseURL = "http://ecommerce_react.test";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />

				<Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} />

			</Switch>
		</BrowserRouter>
	);
}

export default App;
