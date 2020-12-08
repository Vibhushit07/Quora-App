import { setError } from "./error";

const header = {
    authenticate: "",
    authorization: ""
}

var data = {
    userId: ''
}

export const getHeader = () => header;

export const resetHeader = () => {
    header.authenticate = "";
    header.authorization = "";
}

export const getUserData = () => data;

export const setUserData = (userData) => data = { ...data, ...userData };

export const setTokenNId = async (response) => {
    if (response.code) {
        setError(response);
        return false;
    } else {
        header.authorization = 'Bearer ' + response.access_token;
        data.userId = response.id;
        return true;
    }
}

export const setAuthenticate = () => {
    const user = JSON.parse(window.localStorage.getItem('QA-App'));
    header.authenticate = "Basic " + Buffer.from(user.username + ":" + user.password).toString("base64");
}