import Sequelize from "sequelize";

const sequelize = new Sequelize('printer', 'postgres', 'Yugah2005@', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

export default sequelize;