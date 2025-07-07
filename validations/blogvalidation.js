import { z } from "zod";

export const blogvalidation = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  content: z.string().min(50, "Content must have at least 50 characters"),
  tags: z.array(z.string().trim().min(1, "Tag cannot be empty or whitespace")).max(5, "You can add up to 5 tags only").optional(),
});
