import axios from 'axios';


const instance = axios.create({
    baseURL: "https://burgerbuilder-d7fa7.firebaseio.com/"
});

export default instance;