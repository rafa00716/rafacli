export interface LoginPayloadInterface {
    email: string;
    password: string;
}

export interface LoginSuccessResponse {
    access_token: string;
}