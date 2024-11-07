export interface Project {
    project_id: number;
    project_name: string;
    description: string;
    price: string;
    start_date: string; // ISO 8601 Date string
    end_date: string; // ISO 8601 Date string
    project_type_name: string;
    image1: string;
    image2: string;
    image3: string;
    certification_name: string;
    certification_agency: string;
    issued_date: string; // ISO 8601 Date string
    expiry_date: string; // ISO 8601 Date string
    status_id: number;
    created_by?: number;

}

export interface CreateProjectType {
    project_id?: number
    project_name: string | undefined;
    price: number | undefined;
    description: string | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
    project_type_id: number | undefined;
    created_by: number;
    certification_name: string | undefined;
    certification_agency: string | undefined,
    issued_date: string | undefined,
    expiry_date: string | undefined,
    file1?: File;
    file2?: File;
    file3?: File;

}

export interface userDataType {
    username: string;
    password: string;
    email?: string
}

export interface carboncreditsType {
    carbon_credit_id: number;
    transaction_id: string;
    credit_start_date: string;
    credit_end_date: string;
    credit_amount: string;
    project_id: number;
}

export interface ProjectImageUS {
    id: number;
    project_id: number;
    image1?: string;
    image2?: string
    image3?: string
}

export interface DecodedToken {
    username: string;
    exp: number;
}

export interface Transaction {
    transaction_id : number,
    buyer_id: number,
    transaction_date: Date,
    amount: string,
    status: string,
}