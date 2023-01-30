import './App.css'
import Pages from './pages/Pages'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import Category from './components/Category'


function App() {
    return(
        <BrowserRouter>
            <Pages />
        </BrowserRouter>
    )
}

export default App
