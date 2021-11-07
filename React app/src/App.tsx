import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages'
import ResultsPage from './pages/Results'
import CartPage from './pages/Cart'
import ItemPage from './pages/Item'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Cart" element={<CartPage />} />
                <Route path="/Results" element={<ResultsPage />} />
                <Route path="/Item/:id" element={<ItemPage />} />
            </Routes>
        </>
    )
}

export default App
