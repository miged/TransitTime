const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = () => {
  // GET: /users
  router.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
  });

  return router;
};
