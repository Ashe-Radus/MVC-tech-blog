const sequelize = require ('../config/connection');
const { User, Blog } = require('../models');
const userData = require('../seeds/userData.json');
const blogData = require('../seeds/blogData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const user = await User.bulkCreate( userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await blog.create({
            ...Blog,
            user_id: users.id,
        });
    }
    process.exit(0);
};

seedDatabase();