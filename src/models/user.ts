import Joi from "joi";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export const validate = (user: User) => {
  const schema = {
    firstName: Joi.string().min(2).max(64).required(),
    lastName: Joi.string().min(2).max(64).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string().min(3).max(20).required(),
  };

  return Joi.validate(user, schema);
};
