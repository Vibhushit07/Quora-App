var error = {
    code: "",
    message: ""
}

export const getError = () => error;

export const setError = e => error = { ...error, ...e }; 