import "./App.css";
import Calculator from "./components/Calculator";
import { CalcProvider } from "./context";

function App() {
  return (
    <div className="App">
      <CalcProvider>
        <Calculator />
      </CalcProvider>
    </div>
  );
}

export default App;
