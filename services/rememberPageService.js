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
    console.log('From rp service , userToken: ',userToken);

    return axios.post( apiTarget + '/rp/createOrUpdate', newRememberPage,headers);
}
module.exports = {
    createOrUpdateRememberPage
}