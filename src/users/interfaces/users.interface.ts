export interface UserDataAdapter {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
    clientId: string;
    validationToken: string;
}

export interface AddUser {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
}
