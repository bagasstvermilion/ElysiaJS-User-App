import { Request, Response } from "express";
import { getUsers, deleteUser } from "../services/userService";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.status(200).json(users);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUser(parseInt(id, 10));
  res.status(200).json({ message: "User deleted" });
};
