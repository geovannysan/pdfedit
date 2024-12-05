
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"

const MainView = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:id" element={<App />} />
            </Routes>
        </BrowserRouter>

    )
}
export default MainView