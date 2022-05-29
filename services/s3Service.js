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
const removeFile = async(fileUrl) => {
    return axios.post(`${apiTarget}/files/remove`, {'fileUrl':fileUrl} ,headers);
}

const removeFiles = async(filesUrl) => {
    return axios.post(`${apiTarget}/files/removeFiles`, filesUrl ,headers);
}


const uploadFile = async (file,fileTypeThatCanUploaded,userId) => {
    return new Promise((resolve,reject) => {
        if (file) {
            let fileType = file.type;
            let fileSize = file.size;
            if(!(fileTypeThatCanUploaded == "image" && fileSize > 1000000)) {
                let valid = ["image/webp","image/png","image/jpeg"];
                if(fileTypeThatCanUploaded == "video") valid = ["video/webm","video/mp4"];
                if (valid.includes(fileType)) {
                    var fileReader = new FileReader();
                    let uploadedFile = new Object();
                    uploadedFile.type = file.type;
                    let currentTimespan = new Date().getTime()
                    uploadedFile.name = currentTimespan+ '_' + userId + '_' + file.name;
                
                    fileReader.onload = async () => {
                        let fileCode = fileReader.result;
                        //send to S3
                        uploadedFile.blob = fileCode;
                        let formData = new FormData();
                        formData.append("fileName", uploadedFile.name);
                        formData.append("type", uploadedFile.type);
                        formData.append("name", file.name);
                        formData.append("blob", uploadedFile.blob);
                        const axios = require("axios");
                        await axios
                        .post(`${apiTarget}/files`, formData, {
                            headers: { "Content-Type": "multipart/form-data" , 'Authorization': `Bearer ${adminToken}` },
                        })
                        .then((res) => {
                            if(res.status == 500) throw new Error("Internal server error");
                            resolve (
                                res.data.file
                            );
                        })
                        .catch((err) => {
                            console.log("error in save file");
                            console.log(err);
                            reject (
                                "error in save file, please try later"
                            );
                        });
                    };
                    fileReader.readAsDataURL(file);
                
                } else {
                    reject (
                        "file type is not valid"
                    );
                }
            } else {
                reject (
                    "file size is too large"
                );
            }
        }
    });
}

module.exports = {
    removeFile,
    uploadFile,
    removeFiles
}
