import './App.css';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import Main from './Main.js';
import Navigation from './Navigation.js';
import Title from './Title.js';
import Header from './Header.js';

function App() {
  return (
    <>
    <Navigation />
    <Header />
    <Title />
    <Main />
    </>
  );
}

export default App;