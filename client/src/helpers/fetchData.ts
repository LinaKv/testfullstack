import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
});

// token to remember cancel
let cancelTokenSource = axios.CancelToken.source();

const fetchData = async (email: string, phone: string) => {
    try {
        // cancel prev request if it's exist
        cancelTokenSource.cancel('Request canceled');

        // create new cancel token
        cancelTokenSource = axios.CancelToken.source();

        const response = await axiosInstance.post(
            '/data',
            {
                email,
                phone,
            },
            {
                cancelToken: cancelTokenSource.token,
            },
        );
        console.log('Response:', response.data.users);
        return response.data.users;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            console.error('Error:', error);
        }
    }
};

export default fetchData;
