import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Category extends Model {}

Category.init({
    name: {
        type: DT.STRING,
        allowNull:false,
    },
    }, 
{
    sequelize: connection,
    modelName: "Category",
}
);

export default Category;