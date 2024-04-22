import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBook from "../pages/AddBook";

const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/add-book" element={<AddBook />} />
            </Routes>
        </>
    );
};

export default AdminRoutes;
