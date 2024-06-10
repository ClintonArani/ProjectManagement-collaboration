export interface User {
  id: string,
  FirstName: string,
  LastName: string
  phone_number:string,
  email: string,
  password: string,
  user_image: string,
  isAssignedProject: string,
  role: string,
  createdAt: string,
  project_id:string
}

export interface login_details{
  email:string,
  password:string
}

export interface token_details{
  id: string,
  FirstName:string,
  LastName: string,
  email:string,
  role:string
}

