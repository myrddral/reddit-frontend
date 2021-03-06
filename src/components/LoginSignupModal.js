import Login from "./Login"
import Signup from "./Signup"
import "../css/modal.css"
import CloseButton from "../assets/close-24px.svg"
import { useState } from "react"

const LoginSignupModal = (props) => {
  // this value will be updated by the Login component
  const [modalContent, setModalContent]  = useState('login')

  if (!props.show) {
    return null;
  }

  return (
    <>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
              <img src={CloseButton} alt="close" className="close-button" onClick={props.onClose}/>
          </div>
          <div className="modal-body">
            {modalContent === 'login' && <Login props={props} setModalContent={setModalContent}/>}
            {modalContent === 'signup' && <Signup props={props} setModalContent={setModalContent}/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignupModal;