import { z } from "zod";

export const userValidation = z.object({
    username : z.string().min(5, "username must be at least 5 characters"),
    email : z.string().email("invalid email format"),
    password : z.string().min(6,"password must be at least 6 characters").max(10, "password must be at most 10 characters")
})

