export interface LoggedProfile {
    id: string;
    email: string;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    roles: Role[];
    iat: number;
    exp: number;
  }
  
  export interface Role {
    id: number;
    name: string;
    displayName: string;
  }
  