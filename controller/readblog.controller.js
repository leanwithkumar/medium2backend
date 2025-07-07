import blogs from "../models/blogs.model.js";

export const readvlogs = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await blogs.findById(blogId).populate("author", "username");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ message: "Error fetching blog", error: err.message });
  }
};
