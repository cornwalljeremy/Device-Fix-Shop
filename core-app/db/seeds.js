const { User } = require('../models');
const seedData = require('./seedData.json');

const seeds = async (data) => {
  for (user of data) {
    await User.create(user);
  }

  console.log('users seeded');
  process.exit(0);
};

seeds(seedData);
