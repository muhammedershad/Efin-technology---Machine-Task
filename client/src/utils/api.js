import axios from "./axios";

export const addBookFn = async (name, description, publishDate, price) => {
    try {
        const response = await axios.post(`/`, {
            name,
            description,
            publishDate,
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
export const allBookFn = async () => {
    try {
        const response = await axios.get(`/?page=1&limit=10&search=`);
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};

export const deleteBookFn = async (id) => {
    try {
        const response = await axios.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};
export const oneBookDetailsFn = async (id) => {
    try {
        const response = await axios.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};

export const editBooFn = async ( id, name, description, publishDate, price) => {
    try {
        const response = await axios.patch(`/:${id}`, {
            name,
            description,
            publishDate,
            price,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
}
