import { Request, Response } from 'express';

import {
    addCategory,
    findAllCategories,
    findCategoryById,
    findCategoryByTitle,
    editCategory
} from './categoryService';

const createCategory = async (req: Request, res: Response) => {
    const { categoryName } = req.body;
    try {
        //check if category exists
        const category = await findCategoryByTitle(categoryName.toUpperCase());
        if (category) return res.status(400).json({message: "category already exists"});
        //Add category if does not exists
        const record  = await addCategory({categoryName: categoryName.toUpperCase()});
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllCategories = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;

    try {
        //Find categorys with pagination
        const categorys = await findAllCategories(page, limit);
        return res.status(200).json(categorys);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}



const getOneCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await findCategoryById(Number(id));
        if (!category) return res.status(404).json({message: `category with id = ${id} does not exists`});
        return res.json(category);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateCategory =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { categoryName } = req.body;

    try {
        const category = await findCategoryById(Number(id));
        if (!category) return res.status(404).json({message: `category with id = ${id} does not exists`});
    
        category.update({categoryName: categoryName.toUpperCase()});
        return res.status(200).json({message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await findCategoryById(Number(id));
        if (!category) return res.status(404).json({message: `category with id = ${id} does not exists`});

        const deletedcategory = await category.destroy();
        return res.json({record: deletedcategory});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createCategory,
    getAllCategories,
    getOneCategory,
    removeCategory,
    updateCategory
};