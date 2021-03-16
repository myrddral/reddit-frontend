import Login from "./Login"
import Signup from "./Signup"
import "./modal.css"
import CloseButton from "./assets/close-24px.svg"
import { useState } from "react"

const LoginSignupModal = (props) => {
  // this value will be updated by the Login component
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [modalContent, setModalContent]  = useState('login')

  if (!props.show) {
    return null;
  }

  //close modal when the login procedure is finished
  if (isLoggedin === true) {
    props.onClose()
  }

  return (
    <>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
              <img src={CloseButton} alt="close" className="close-button" onClick={props.onClose}/>
          </div>
          <div className="modal-body">
            {modalContent === 'login' && <Login setIsLoggedin={setIsLoggedin} setModalContent={setModalContent}/>}
            {modalContent === 'signup' && <Signup setModalContent={setModalContent}/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignupModal;
