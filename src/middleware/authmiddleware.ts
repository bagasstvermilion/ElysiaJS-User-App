export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};
