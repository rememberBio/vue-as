const axios = require('axios');
let apiTarget = "";
if (process.env.NODE_ENV == "production") {
    apiTarget = "/api"
}
if (process.env.NODE_ENV == "development") {
    apiTarget = "http://localhost:4000"
}
const headers = {
    headers: {},
}
const createOrUpdateRememberPage = (newRememberPage,userToken) => {
    headers.headers = {
        'Authorization': `Bearer ${userToken}`
    };
    if(!newRememberPage.status) newRememberPage.status = 'in progress';

    return axios.post( apiTarget + '/rp/createOrUpdate', newRememberPage,headers);
}

const getRememberPageById = (id,userToken) => {
    headers.headers = {
        'Authorization': `Bearer ${userToken}`
    };
    return axios.get( apiTarget + '/rp/getById/' + id,headers);
}
module.exports = {
    createOrUpdateRememberPage,
    getRememberPageById
}