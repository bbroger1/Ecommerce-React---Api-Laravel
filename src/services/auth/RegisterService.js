import axios from "axios";

const register = {};

register.store = async (data) => {

    const res = axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/register', data)
            .then(res => { return res.data })
            .catch(error => { return error.res })
    });

    return res;
}

export default register;