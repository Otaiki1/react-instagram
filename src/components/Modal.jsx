export default function Modal(){
    return(
        <div className="modal">
            <h1>Are you sure you want to delete?</h1>
            <div className="modal-buttons">
                <button className="modal-confirm">Confirm</button>
                <button className="modal-cancel">Cancel</button>
            </div>
        </div>
    )   
}