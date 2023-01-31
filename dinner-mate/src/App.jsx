import './App.css'
import Pages from './pages/Pages'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import Category from './components/Category'
import Search from './components/Search'


function App() {
    return(
        <BrowserRouter>
            <Navbar />
            <Search />
            <Category />
            <Pages />
        </BrowserRouter>
    )
}

export default App
