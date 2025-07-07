import blogs from "../models/blogs.model.js";

export const searchBlogs = async (req, res) => {
  const query = req.query.query?.trim();

  if (!query) return res.status(400).json({ message: "Search query is required" });

  try {
    const allBlogs = await blogs.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ]
    }).populate("author", "username");

    const finalResults = allBlogs.filter(blog =>
      blog.author?.username?.toLowerCase().includes(query.toLowerCase())
    ).concat(
      allBlogs.filter(blog =>
        !blog.author?.username?.toLowerCase().includes(query.toLowerCase())
      )
    );

    res.status(200).json(finalResults);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};
