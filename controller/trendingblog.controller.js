import blogs from "../models/blogs.model.js";

export const trendingblog = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const trending = await blogs
      .find()
      .populate("author", "username") 
      .sort({ createdAt: -1 })        
      .skip(skip)
      .limit(limit);

    res.status(200).json(trending);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trending blogs", error: err.message });
  }
};
