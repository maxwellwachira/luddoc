import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db } from '../../config/dbconfig';

interface CategoryAttributes {
    id: number;
    categoryName: string;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;


export class CategoryModel extends Model<CategoryAttributes, CategoryCreationAttributes> {}


CategoryModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   categoryName:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "category_name"
   }
},{
    sequelize: db,
    tableName: "categories",
    modelName: "Category"
});
