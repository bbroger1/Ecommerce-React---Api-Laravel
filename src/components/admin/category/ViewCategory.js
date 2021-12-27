import { Link } from "react-router-dom";
import DataTable from "./components/DataTable";

function ViewCategory() {

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>Category List
                        <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add Category</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <DataTable
                        fetchUrl="/api/view-category"
                        columns={["id", "name", "slug", "status", "actions"]}>
                    </DataTable>
                </div>
            </div>
        </div>
    )

}

export default ViewCategory;