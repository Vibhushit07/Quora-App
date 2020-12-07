import { getHeader, getUserData } from '../Data/userData';

export const signup = async (body) =>
    await fetch('/api/user/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => err.json());


export const signin = async () =>

    await fetch('/api/user/signin', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authenticate': getHeader().authenticate
        }
    })
        .then(async (response) => {
            const access_token = response.headers.get('access_token');
            const res = await response.json();
            res.access_token = access_token;
            return res;
        })
        .catch(err => {
            console.log('error ', err);
            return err.json();
        })

export const signout = async () => {
    return await fetch('/api/user/signout', {
        method: 'post',
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

export const profile = async () => {
    return await fetch('/api/userprofile/' + getUserData().userId, {
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