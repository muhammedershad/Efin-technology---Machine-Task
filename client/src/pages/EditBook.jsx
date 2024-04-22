import React, { useEffect, useState } from "react";
import { editBookFn, oneBookDetailsFn } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditBook = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [publishDate, setPublishDate] = useState();
    const [price, setPrice] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await oneBookDetailsFn(id);
            setName(response.data.name);
            setDescription(response.data.description);
            setPublishDate(response.data.publishDate);
            setPrice(response.data.price);
        })();
    }, []);

    const editBook = async () => {
        const response = await editBookFn(id, name, description, publishDate, price);
        if (response.success) {
            toast.success(response.message);
            navigate("/");
        }
    };
    return (
        <>
            <div>
                <Toaster />
            </div>
            <div className="h-full w-full justify-center align-middle p-10 flex">
                <div className="max-w-sm mx-auto w-1/2 ">
                    <h1 className="text-white text-center mb-4 text-xl">
                        Edit Book
                    </h1>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Book Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="name"
                            id="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Harry Potter"
                            required
                        />
                    </div>
                    <div class="mb-5">
                        <label
                            for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Book Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="message"
                            rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Leave a comment..."
                        ></textarea>
                    </div>
                    <div class="mb-5">
                        <label
                            for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Book Published Date
                        </label>

                        <div className="relative max-w-sm">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <input
                                defaultValue={new Date(publishDate)}
                                type="date"
                                value={publishDate}
                                onChange={(e) => setPublishDate(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Select date"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Book Price
                        </label>
                        <input
                            type="number"
                            id="number"
                            value={price}
                            min={0}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Harry Potter"
                            required
                        />
                    </div>
                    <button
                        onClick={editBook}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditBook;
