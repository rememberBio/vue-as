const axios = require('axios');
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTU2OWE5YjFlMDQxZGYzNDI5MzA3ZiIsImlhdCI6MTY0OTc2ODUwMH0.CvGtQMzzI9o_PjcW3H6qLpyLiD2aIcylvNdc1P0gJEk";
const headers = {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
  }
const createUser = async(newUser) => {
    const response = await axios.post('/api/user/createUser', newUser,headers);
    return response.data;
}
const deleteUser = async() => {
    const response = await axios.get('/api/user/deleteUser',headers);
    return response.data;
}
const getUserByEmail = async(email) => {
    const response = await axios.get(`/api/user/getUserByEmail/${email}`);
    return response.data;
}
const getUsers = async() => {
    const response = await axios.get('/api/user/getUsers',headers);
    return response.data;
}


const updateUser = async(id, user) => {
    const response = await axios.post('/api/user/updateUser', { id: id, user: user },headers);
    return response.data;
}
const updatePasswordInNode = async(id, password) => {
    const response = await axios.post('/api/user/updatePassword', { id: id, password: password },headers);
    return response.data;
}
const createToken = async(email, password) => {
    const response = await axios.post('/api/user/createToken', { email: email, password: password },headers);
    return response.data;
}

const updateUserStatus = async(email, isActive) => {
    const response = await axios.post('/api/user/updateUserStatus', { email: email, isActive: isActive },headers);
    return response.data;
}
module.exports = {
    createUser,
    deleteUser,
    getUserByEmail,
    getUsers,
    updateUser,
    updateUserStatus,
    updatePasswordInNode,
    createToken
}