import React, { useEffect, useState } from "react";
import { allBookFn, deleteBookFn } from "../utils/api";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../components/spinner";

const AllBooks = () => {
    const [books, setBooks] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [totalBooks, setTotalBooks] = useState();
    const [search, setSearch] = useState();
    const [rangeText, setRangeText] = useState();
    const [pageLinks, setPageLinks] = useState();
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await allBookFn(search, currentPage);
            setBooks(response.data.books);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
            setTotalBooks(response.data.totalBooks);

            const startIndex = (response.data.currentPage - 1) * 10 + 1;
            const endIndex = Math.min(
                response.data.currentPage * 10,
                response.data.totalBooks
            );

            setRangeText(
                totalBooks === 0
                    ? "No books"
                    : `Showing ${startIndex}-${endIndex} of ${totalBooks}`
            );

            generatePageLinks(
                response.data.currentPage,
                response.data.totalPages
            );
        })();
    }, [search, currentPage, reRender]);

    const generatePageLinks = (currentPage, totalPages) => {
        const pageLinks = [];
        const range = 2;

        for (
            let i = Math.max(1, currentPage - range);
            i <= Math.min(totalPages, currentPage + range);
            i++
        ) {
            pageLinks.push(i);
        }

        setPageLinks(pageLinks);
    };

    const deleteBook = async (id) => {
        const response = await deleteBookFn(id);
        if (response.success) toast.success("Book deleted successfully");
        setReRender((pre) => !pre);
    };

    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const nextPage = () => {
        if (currentPage < totalPages && currentPage !== totalPages)
            setCurrentPage(currentPage + 1);
    };

    return (
        <div className="p-14 ">{
            books? (<>
                <div>
                    <Toaster />
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <h1 className="text-white text-xl text-center mb-5">
                        All Books
                    </h1>
                    <div className="w-full flex justify-between align-middle">
                        <Link to={"/add-book"}>
                            <button className="text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add Book
                            </button>
                        </Link>
                        <div className="max-w-md mx-auto mb-5">
                            <label
                                htmlFor="default-search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    type="search"
                                    id="default-search"
                                    className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Book Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Published Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {books?.map((book) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {book.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {book.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            book.publishDate
                                        ).toLocaleDateString("en-US")}
                                    </td>

                                    <td className="px-6 py-4">{book.price}</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/edit-book/${book._id}`}>
                                            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Edit
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a
                                            onClick={() => deleteBook(book._id)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav
                        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                        aria-label="Table navigation"
                    >
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                            {rangeText}
                        </span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <a
                                    onClick={previousPage}
                                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Previous
                                </a>
                            </li>
                            {pageLinks?.map((pageNumber) => (
                                <li key={pageNumber}>
                                    <a
                                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                                            pageNumber === currentPage
                                                ? "font-semibold"
                                                : ""
                                        }`}
                                    >
                                        {pageNumber}
                                    </a>
                                </li>
                            ))}

                            <li>
                                <a
                                    onClick={nextPage}
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>) : (<Spinner />)
        }
            
        </div>
    );
};

export default AllBooks;
