const axios = require('axios');
let apiTarget = "";
if (process.env.NODE_ENV == "production") {
    apiTarget = "/api"
}
if (process.env.NODE_ENV == "development") {
    apiTarget = "http://localhost:4000"
}
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGYzOWVkODYxOTk3MjRhYzMzZGEwYiIsImlhdCI6MTY1MzU1NDkwM30.3VMzMcAXCkm58r1ap8EnkWJNUUEJ8JEFzhkQRYDGSUI";
const headers = {
headers: {},
}
const createUser = async(newUser) => {
    const response = await axios.post(`${apiTarget}/user/createUser`, newUser);
    return response.data;
}

const getUserByEmail = async(email) => {
    const response = await axios.get(`${apiTarget}/user/getUserByEmail/${email}`);
    return response.data;
}
const getUserRp = async(userToken) => {
    headers.headers = {
        'Authorization': `Bearer ${userToken}`
    };
    const response = await axios.get(`${apiTarget}/user/getUserRp`,headers);
    return response.data;
}
const updateUser = async(id, user,userToken) => {
    headers.headers = {
        'Authorization': `Bearer ${userToken}`
    };
    const response = await axios.post(`${apiTarget}/user/updateUser`, { id: id, user: user },headers);
    return response.data;
}

const updateUserStatus = async(email, isActive, userToken) => {
    headers.headers = {
        'Authorization': `Bearer ${userToken}`
    };
    const response = await axios.post(`${apiTarget}/user/updateUserStatus`, { email: email, isActive: isActive },headers);
    return response.data;
}
module.exports = {
    createUser,
    getUserByEmail,
    updateUser,
    updateUserStatus,
    getUserRp
}