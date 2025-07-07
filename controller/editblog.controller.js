import blogs from "../models/blogs.model.js";


export const getSingleBlog = async (req, res) => {
  try {
    const blog = await blogs.findById(req.params.id).populate("author", "username");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog", error: err.message });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await blogs.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const deleted = await blogs.findByIdAndDelete(blogId);

    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};