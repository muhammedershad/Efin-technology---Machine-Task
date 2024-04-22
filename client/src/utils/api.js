import axios from "./axios";

const addBook = async (name, description, publishedDate, price) => {
    try {
        const response = await axios.post(`/`, {
            name,
            description,
            publishedDate,
            price,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};

export default {
    addBook,
};
