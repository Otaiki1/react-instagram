export default function Modal({ confirmHandler, cancelHandler, modalText }) {
  return (
    <div className="modal">
      <h1>{modalText}</h1>
      <div className="modal-buttons">
        <button className="modal-confirm" onClick={confirmHandler}>
          Confirm
        </button>
        <button className="modal-cancel" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    </div>
  );
}
