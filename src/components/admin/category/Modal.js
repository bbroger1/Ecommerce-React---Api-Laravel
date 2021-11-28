import React, { Component } from 'react';

export default class Modal extends Component {
    render() {
        let modalStyle = {
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.8)',
        }

        return (
            <div className="modal show fade" style={modalStyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Confirmation</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure want to delete: {this.props.categoryName}?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.props.hide}>Close</button>
                            <button type="button" className="btn btn-warning" onClick={this.props.deleteCategory}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};