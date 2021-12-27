import React from "react";
import { Route, Switch } from "react-router";
import Navbar from "./Navbar";

import publicRoutesList from "../../routes/PublicRouteList";

const FrontEndLayout = () => {

    return (
        <div>
            <Navbar />
            <div>
                <Switch>
                    {
                        publicRoutesList.map((routedata, index) => {
                            return (
                                routedata.component && (
                                    <Route
                                        key={index}
                                        path={routedata.path}
                                        exact={routedata.exact}
                                        name={routedata.name}
                                        render={(props) => (
                                            <routedata.component{...props} />
                                        )}
                                    />
                                )
                            )
                        })
                    }
                </Switch>
            </div>
        </div>
    )
}

export default FrontEndLayout;