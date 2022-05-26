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
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
  }
const createUser = async(newUser) => {
    const response = await axios.post(`${apiTarget}/user/createUser`, newUser,headers);
    return response.data;
}
const deleteUser = async() => {
    const response = await axios.get(`${apiTarget}/user/deleteUser`,headers);
    return response.data;
}
const getUserByEmailAndPassword = async(email,password) => {
    const response = await axios.get(`${apiTarget}/user/getUserByEmailAndPassword/${email}/${password}`,headers);
    return response.data;
}
const getUsers = async() => {
    const response = await axios.get(`${apiTarget}/user/getUsers`,headers);
    return response.data;
}


const updateUser = async(id, user) => {
    const response = await axios.post(`${apiTarget}/user/updateUser`, { id: id, user: user },headers);
    return response.data;
}
const updatePasswordInNode = async(id, password) => {
    const response = await axios.post(`${apiTarget}/user/updatePassword`, { id: id, password: password },headers);
    return response.data;
}
const createToken = async(email, password) => {
    const response = await axios.post(`${apiTarget}/user/createToken`, { email: email, password: password },headers);
    return response.data.token;
}

const updateUserStatus = async(email, isActive) => {
    const response = await axios.post(`${apiTarget}/user/updateUserStatus`, { email: email, isActive: isActive },headers);
    return response.data;
}
module.exports = {
    createUser,
    deleteUser,
    getUserByEmailAndPassword,
    getUsers,
    updateUser,
    updateUserStatus,
    updatePasswordInNode,
    createToken
}