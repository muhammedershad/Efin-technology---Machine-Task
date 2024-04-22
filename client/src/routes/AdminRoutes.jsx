import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import EditBook from "../pages/EditBook";

const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/edit-book/:id" element={<EditBook />} />
                <Route path="/" element={<AllBooks />} />
            </Routes>
        </>
    );
};

export default AdminRoutes;
