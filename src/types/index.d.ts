export {}

declare global {
    namespace Express {
        export interface Request {
            usrCredentials: {
                email: string;
                userName: string;
                password: string;
                student: boolean;
            },
            jobData: {
                pay: number;
                empId: string;
                jobName: string;
                jobType: string;
                jobImage?: string;
                benefits?: [string];
                jobCategory: string;
                jobDescription: string;
                jobLocations?: [string];
            }
        }
    }
}