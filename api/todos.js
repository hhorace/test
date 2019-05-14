import axios from 'axios';
import 'babel-polyfill';
const postBaseUrl = 'http://test-2-again.us-west-2.elasticbeanstalk.com/db';

export function listTodos(unaccomplishedOnly = false, searchText = '', start) {
    let url = `${postBaseUrl}/posts`;
    let query = [];
    if(unaccomplishedOnly){
        query.push(`unaccomplishedOnly=${unaccomplishedOnly}`);
    }
    if (searchText){
        query.push(`searchText=${searchText}`);
    }
    if (start)
        query.push(`start=${start}`);
    if (query.length)
        url += '?' + query.join('&');
    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createTodo(mood, text) {
    let url = `${postBaseUrl}/posts`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        mood,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function accomplishTodo(id) {
    let url = `${postBaseUrl}/posts/${id}`;
    console.log(`Making POST request to: ${url}`);
    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
