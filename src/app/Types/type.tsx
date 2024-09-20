export interface Project {
    project_id: number;
    project_name: string;
    price: number;
    description: string;
    start_date: string;
    end_date: string;
    project_type_id: number;
    created_by: number;
    created_at: string;
}

export interface CreateProjectType {
project_id?: number
  project_name: string;
  price: number;
  description: string;
  start_date: string;
  end_date: string;
  project_type_id: number;
  created_by: number;
  certification_name: string;
  issuing_organization: string,
  issued_date: string,
  expiry_date: string,
  credit_amount: number;
}