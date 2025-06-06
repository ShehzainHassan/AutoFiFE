export type FirstNameProps = {
  fname: string;
  setFname: (value: string) => void;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};
export type LastNameProps = {
  lname: string;
  setLname: (value: string) => void;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};
export type PostCodeProps = {
  postCode: string;
  setPostCode: (value: string) => void;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};
export type EmailProps = {
  email: string;
  setEmail: (value: string) => void;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};
export type PhoneProps = {
  phone: string;
  setPhone: (value: string) => void;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};
export type CommentProps = {
  commentText: string;
  setCommentText: (value: string) => void;
};
