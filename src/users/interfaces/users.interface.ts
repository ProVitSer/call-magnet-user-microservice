export interface RegisterUser {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface UserDataAdapter {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
    clientId: string;
    validationToken: string;
}
