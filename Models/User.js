import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class User extends Model {}

User.init({
    name: {
        type: DT.STRING,
        allowNull:false,
    },
    lastName: {
        type: DT.STRING,
        allowNull: false,
    },
    
    password: {
        type: DT.STRING,
        allowNull: false,
    },
    email: {
        type: DT.STRING,
        allowNull: false,
        validate:{
            isEmail: true,
        }
    },
    salt:{
        type: DT.STRING,
    }
    }, 
{
    sequelize: connection,
    modelName: "User",
    timestamps: false
}
);

User.beforeCreate(async(user) => {
    const salt = await bcrypt.genSalt();
    user.salt = salt;

    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;
});

export default User;