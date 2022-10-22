
import "./style.scss"
import AnimatedRoutes from "./components/animatedRoutes"
import {BrowserRouter} from "react-router-dom"
function App() {
  
  return (
    <BrowserRouter>
      <AnimatedRoutes/>
    </BrowserRouter>
  );
}

export default App;
