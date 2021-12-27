import { Route } from "react-router-dom";
import FrontEndLayout from "./layouts/frontend/FrontEndLayout.js";

function PublicRoute({ ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => <FrontEndLayout {...props} />
            }
        />
    )
}

export default PublicRoute;