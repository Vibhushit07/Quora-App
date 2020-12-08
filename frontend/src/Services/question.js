import { getHeader, getUserData } from '../Data/userData';

export const postQuestion = async (question) => {

    return await fetch('/api/question/create', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getHeader().authorization
        },
        body: JSON.stringify(question)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('error ', err));
}

export const getAllQuestions = async () => {

    return await fetch('/api/question/all', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getHeader().authorization
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('error ', err));
}

export const editQuestion = async (questionId, question) => {

    return await fetch('/api/question/edit/' + questionId, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getHeader().authorization
        },
        body: JSON.stringify(question)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('error ', err));
}

export const deleteQuestion = async (questionId) => {

    return await fetch('/api/question/delete/' + questionId, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getHeader().authorization
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('error ', err));
}

export const getUserQuestions = async () => {

    return await fetch('/api/question/all/' + getUserData().userId, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getHeader().authorization
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('error ', err));
}