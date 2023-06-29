import { Category } from "../Models/index.js";

const CategorySeed = async () => {
    try{
        const teclado = await Category.findAll({where:{
            name: "Teclados"
        }})
        if (teclado == 0) {
            
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
        }
    } catch(error) {
        console.log(error)
    }
}

export default CategorySeed;