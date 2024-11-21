export const getUsers = (req: any, res: any) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Jack Doe" },
  ];

  res.json(users);
};
