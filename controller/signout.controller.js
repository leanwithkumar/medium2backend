export const Signout = (req, res) => {
  res.clearCookie("medium2token", {   
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
  res.status(200).json({ message: "Signed out successfully" });
};
