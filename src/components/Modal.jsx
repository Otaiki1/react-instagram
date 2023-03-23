export default function Modal({confirmHandler, cancelHandler}){
    return(
        <div className="modal">
            <h1>Are you sure you want to delete?</h1>
            <div className="modal-buttons">
                <button className="modal-confirm" onClick={confirmHandler}>Confirm</button>
                <button className="modal-cancel" onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    )   
}