import { JwtPayload } from "jsonwebtoken";

export {}

declare global {
    namespace Express {
        export interface Request {
            usrCredentials: {
                email: string;
                userName: string;
                password: string;
                student: boolean;
                profilePic?: string;
                preferredJobType?: string;
                skills?: string | [string];
                yearsOfExperience?: string;
            },
            empCredentials: {
                email: string;
                password: string;
                compName: string;
                compDomain?: string;
                compLocations?: [string];
            }
            jobData: {
                pay: number;
                jobName: string;
                jobType: string;
                country?: string;
                jobImage?: string;
                jobCategory: string;
                jobDescription: string;
                jobLocations?: string | [string];
                empId?: string | JwtPayload;
                benefits?: string | [string];
            }
        }
    }
}