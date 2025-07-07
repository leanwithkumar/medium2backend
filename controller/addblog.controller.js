import blogs from "../models/blogs.model.js";
import { blogvalidation } from "../validations/blogvalidation.js";
export const addblog = async (req, res) => {
  try {
    const validblog = blogvalidation.parse(req.body);

    const { title, content, tags = [] } = validblog;
    const author = req.body.author; // ✅ get it directly

    if (!author) {
      return res.status(400).json({ message: "Author is required" });
    }

    const newblog = new blogs({
      title,
      content,
      author,
      tags,
    });

    await newblog.save();

    res.status(200).json({
      message: "Blog published successfully",
    });
  } catch (err) {
    console.error("Add Blog Error:", err);

    if (err.name === "ZodError") {
      const messages = err.errors.map((e) => e.message);
      return res.status(400).json({
        errors: messages,
      });
    }

    res.status(400).json({
      message: "Unable to add blog",
      error: err.message,
    });
  }
};
