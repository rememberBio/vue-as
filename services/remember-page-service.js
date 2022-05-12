const axios = require('axios');
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTU2OWE5YjFlMDQxZGYzNDI5MzA3ZiIsImlhdCI6MTY0OTc2ODUwMH0.CvGtQMzzI9o_PjcW3H6qLpyLiD2aIcylvNdc1P0gJEk";

const headers = {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
}
const createRememberPage = async(newRememberPage) => {
    const response = await axios.post('/api/rp/createOrUpdate', newRememberPage,headers);
    return response.data;
}
const updateRememberPage = async(id, rememberPage) => {
    const response = await axios.post('/api/user/updateUser', { id: id, rememberPage: rememberPage },headers);
    return response.data;
}
module.exports = {
    updateRememberPage,
    createRememberPage
}