import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db } from '../../config/dbconfig';
import { CategoryModel } from '../categories/categoryModel';
import { UserModel } from '../../appUsers/users/userModel';

interface UploadsAttributes {
    id: number;
    fileName: string;
    fileExtension: string;
    fileType: string;
    fileSize: number;
    filePath: string;
    UserId: number;
    CategoryId: number;
    createdAt?: string;
    updatedAt?:string;
}

type UploadCreationAttributes = Optional<UploadsAttributes, 'id'>;

export class UploadModel extends Model<UploadsAttributes, UploadCreationAttributes> {}

UploadModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   fileName:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "file_name"
   },
   fileExtension:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "file_extension"
   },
   CategoryId: {
    type: DataTypes.BIGINT,
    field: "category_id"
   },
   fileType:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "file_type"
   },
   fileSize: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "file_size"
   },
   filePath: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "file_path"
   },
   UserId: {
    type: DataTypes.BIGINT,
    field: "uploaded_by"
   },
},{
    sequelize: db,
    tableName: "uploads",
    modelName: "Upload"
});

CategoryModel.hasMany(UploadModel);
UploadModel.belongsTo(CategoryModel);

UserModel.hasMany(UploadModel);
UploadModel.belongsTo(UserModel);


