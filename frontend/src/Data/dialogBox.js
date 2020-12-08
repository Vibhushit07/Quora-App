const dialogBox = {
    title: "",
    message: "",
    accept: "",
    reject: ""
}

export const getDialogBox = () => dialogBox;

export const setDialogBox = (title = "", message = "", accept = "", reject = "") => {
    dialogBox.title = title;
    dialogBox.message = message;
    dialogBox.accept = accept;
    dialogBox.reject = reject;
}