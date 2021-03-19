import { useAuth } from "./auth";
import { useRef, useState } from "react";
import "./signup.css";

const Login = ({props, setModalContent}) => {
  const { login } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      setError('Failed to sign in')
    }
    setLoading(false)
    //close modal when finished logging in
    props.onClose()
  }
  
  return (
    <>
      <div className="signup-main">
        <h2>Log In</h2>
        {error && <p className="error">{error}</p>}
        <form className="login-signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} required />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            required
          />
          <button disabled={loading} type="submit" onClick={handleSubmit}>
            Log In
          </button>
        </form>
        <p>Need an account? <span onClick={() => setModalContent('signup')} style={{cursor: 'pointer', textDecoration: 'underline'}}>Sign Up!</span></p>
      </div>
    </>
  );
};

export default Login;
