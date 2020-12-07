import { getHeader } from '../Data/userData';

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