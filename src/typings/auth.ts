export interface RegisterProps {
  email: string;
  fname: string;
  lname: string;
  password: string;
  setValues?: (e: any) => void | undefined;
}

export interface LoginProps {
  email: string;
  password: string;
  setValues?: (e: any) => void | undefined;
}