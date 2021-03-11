import useAuth from './auth';
import { useRef } from 'react';

const Registration = () => {

    const { registration } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        registration(emailRef.current.value, passwordRef.current.value);
      }

    return ( 
        <>
        <h1 className="registration">TEST</h1>
        <button onClick={handleSubmit}>Submit</button>
        </>
     );
}
 
export default Registration;