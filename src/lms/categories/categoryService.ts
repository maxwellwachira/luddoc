import { CategoryModel } from "./categoryModel";

interface CategoryRegistrationData {
    categoryName: string;
}

const addCategory = async ({categoryName}: CategoryRegistrationData) => {
    return await CategoryModel.create({
        categoryName
    });
}

const findAllCategories = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await CategoryModel.findAndCountAll({
        limit,
        offset,
        order: [['id', 'ASC']]
    });
    const totalPages = Math.ceil(count / limit);

    return {
        totalCategories: count,
        totalPages,
        currentPage: page,
        categories: rows
    };
}


const findCategoryById = async (id: number) => {
    return await CategoryModel.findOne({
        where: {
            id, 
        }
    });
}

const findCategoryByTitle = async (categoryName: string) => {
    return await CategoryModel.findOne({
        where: {
           categoryName
        }
    });
}

const editCategory = async () => {

}


export {
    addCategory,
    findAllCategories,
    findCategoryById,
    findCategoryByTitle,
    editCategory
};