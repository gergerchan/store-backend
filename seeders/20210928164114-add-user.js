"use strict";

const { nanoid } = require("nanoid");

const bcrypt = require("bcrypt");

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  return passwordHash;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: nanoid(),
        username: "admin001",
        password: await hash("admin001"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(),
        username: "gerry001",
        password: await hash("faisal01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return await queryInterface.bulkInsert("Users", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
