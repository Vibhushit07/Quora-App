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