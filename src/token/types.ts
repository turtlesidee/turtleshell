export interface CheckTokenConfiguration {
    jwt_secret: string;
    claims: string[];
    audiences: string[];
}

export interface CheckRefreshTokenConfiguration {
    jwt_secret: string;
}
