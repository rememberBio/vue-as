export class User {
    constructor(firstName, lastName, userId, email, password, phone, isActive, types,rememberPages) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.isActive = isActive;
        this.types = types; //editor,pageManager,siteManager
        this.rememberPages = rememberPages; //remember page id , permission (editor, pageManager)
        this._id = userId;
    }
}