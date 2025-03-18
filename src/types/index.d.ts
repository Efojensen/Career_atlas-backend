export {}

declare global {
    namespace Express {
        export interface Request {
            usrCredentials: {
                email: string;
                userName: string;
                password: string;
                student: boolean;
            }
        }
    }
}