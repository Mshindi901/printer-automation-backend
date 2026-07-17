import Sequelize from "sequelize";

const sequelize = new Sequelize('postgresql://test_v4w1_user:6HvjFE3jioxXJfsNG2LxWyRKI7vKBTno@dpg-d9d2c8t7vvec73enebhg-a/test_v4w1', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

export default sequelize;