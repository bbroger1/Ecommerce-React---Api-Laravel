import DataTable from "./components/DataTable";
import { Link } from "react-router-dom";

function ViewProduct() {

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>Product List
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <DataTable
                        fetchUrl="/api/view-product"
                        columns={["id", "image", "name", "category", "selling_price", "status", "actions"]}>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;