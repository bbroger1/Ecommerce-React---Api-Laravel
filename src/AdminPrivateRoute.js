import React, { useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import MasterLayout from "./layouts/admin/MasterLayout";

function AdminPrivateRoute({ ...rest }) {

    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/checkAuthenticated').then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false)
        })
            .catch(function (error) {
                if (error.response.status === 401) {
                    swal("Unauthorized", error.response.data.message, "warning");
                    history.push('/');
                } else if (error.response.status === 403) {
                    swal("Forbidden", error.response.data.message, "warning");
                    history.push('/');
                    //404 page not found
                } else if (error.response.status === 404) {
                    swal("404 Error", "Page Not Found", "warning");
                    history.push('/');
                }
            });

        return () => {
            setAuthenticated(false);
        };
    }, [history]);

    /*
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {

        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            history.push('/');
        }

        let isFirefox = typeof InstallTrigger;

        if (isFirefox) {
            return err;
        }

        return Promise.reject(err);

    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {

        //403 access denied
        if (error.response.status === 403) {
            swal("Forbidden", error.response.message, "danger");
            history.push('/Page403');
            //404 page not found
        } else if (error.response.status === 404) {
            swal("404 Error", "Page Not Found", "warning");
            history.push('/Page404');
        }

        let isFirefox = typeof InstallTrigger;

        if (isFirefox) {
            return error;
        }

        return Promise.reject(error);
    });*/


    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Route {...rest}
            render={({ props, location }) =>
                authenticated ?
                    (<MasterLayout {...props} />) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
            }
        />
    )
}

export default AdminPrivateRoute;