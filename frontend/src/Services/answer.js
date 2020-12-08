import { getHeader } from '../Data/userData';
import { getQuestionId } from "../Data/answers";

export const postAnswer = async (answer) => {
    return await fetch(`/api/question/${getQuestionId()}/answer/create`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getHeader().authorization
        },
        body: JSON.stringify(answer)
    })
        .then(response => { return response.json(); })
        .catch(err => alert(err))
}

export const editAnswer = async (answerId, answer) => {
    return await fetch(`/api/answer/edit/${answerId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getHeader().authorization
        },
        body: JSON.stringify(answer)
    })
        .then(response => { return response.json(); })
        .catch(err => alert(err))
}

export const deleteAnswer = async (answerId) => {
    return await fetch(`/api/answer/delete/${answerId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'authorization': getHeader().authorization
        },
    })
        .then(response => response.json())
        .catch(err => err.json())
}