import { useAuth } from "../backend/auth";
import { useRef, useState } from "react";
import { useHistory } from 'react-router-dom'
import "../css/signup.css";

const Signup = ({props, setModalContent}) => {
  const { registration } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await registration(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch (error) {
      setError('Failed to create an account')
    }
    setLoading(false)
    //close modal when finished logging in
    props.onClose()
  }

  return (
    <>
      <div className="signup-main">
        <h2>Sign Up</h2>
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
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            type="password"
            name="password-confirm"
            id="password-confirm"
            ref={passwordConfirmRef}
            required
          />
          <button disabled={loading} type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <p>Do you have an account? <span onClick={() => setModalContent('login')} style={{cursor: 'pointer', textDecoration: 'underline'}}>Log In!</span></p>
      </div>
    </>
  );
};

export default Signup;
