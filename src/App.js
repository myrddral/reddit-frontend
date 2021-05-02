import "./css/App.css";
import Main from "./components/Main.js";
import { AuthProvider } from "./backend/auth";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="window-main">
          <Main />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
