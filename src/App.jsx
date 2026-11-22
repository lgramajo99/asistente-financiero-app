import "./App.css";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Errorpage";

function App() {
  return (
    <>
      <section>
        <h1>Welcome to Asistente Financiero</h1>
        <Dashboard />
        <ErrorPage />
      </section>
    </>
  );
}

export default App;
