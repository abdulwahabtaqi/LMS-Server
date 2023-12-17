

export interface Login {
    email: string;
    password: string;
}


export interface Registration {
    name: string;
    email: string;
    role: UserRole;
    password: string;
}
export enum UserRole {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}

export interface JWTEncryptedData {
    id: string;
    email: string;
    name: string;
    role: string;
    joinDate:Date;
}