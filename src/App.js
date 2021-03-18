import "./App.css";
import Main from "./Main.js";

import { AuthProvider } from "./auth";

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