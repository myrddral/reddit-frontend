import "./css/App.css";
import Main from "./components/Main.js";

import { AuthProvider } from "./backend/auth";

function App() {
  return (
    <>
        <AuthProvider>
          <Main />
        </AuthProvider>
    </>
  );
}

export default App;