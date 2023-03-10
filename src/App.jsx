import "./App.css";
import Pages from "./pages/Pages";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Category from "./components/Category";
import Search from "./components/Search";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Pages />
        </BrowserRouter>
    );
    }

export default App;
