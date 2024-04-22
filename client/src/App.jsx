import Error404 from "./pages/Error404";
import AdminRoutes from "./routes/AdminRoutes";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                {/* Specific routes for Admin and Employee */}
                <Route path="/*" element={<AdminRoutes />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    );
}

export default App;
