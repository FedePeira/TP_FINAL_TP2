import { Category } from "../Models/index.js";

const CategorySeed = async () => {
    try{
        await Category.bulkCreate([
            {
                name: "Teclados",
            },
            {
                name: "Parlantes",
            },
            {
                name: "Monitores",
            },
        ]);
    } catch(error) {
        console.log(error)
    }
}

export default CategorySeed;