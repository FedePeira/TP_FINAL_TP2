import Category from "./Category.js";
import Product from "./Product.js";
import User from "./user.js";

Category.hasMany(Product, {
    foreignKey:"categoryId"
})
Product.belongsTo(Category, {
    foreignKey:"categoryId"
})

export { Category, Product, User };