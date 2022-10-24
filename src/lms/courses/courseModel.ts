import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db } from '../../config/dbconfig';
import { CategoryModel } from '../categories/categoryModel';
interface CourseAttributes {
    id: number;
    courseTitle: string;
    CategoryId: number;
    coursePricing: number;
    courseDescriptionTitle: string;
    courseDescriptionContent: string;
    courseThumbnailUrl: string;
    hasVideo: boolean;
    videoSource: string;
    videoUrl: string;
    grannysId: string;
    createdAt?: string;
    updatedAt?:string;
}

type CourseCreationAttributes = Optional<CourseAttributes, 'id'>;


export class CourseModel extends Model<CourseAttributes, CourseCreationAttributes> {}


CourseModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   courseTitle:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "course_title"
   },
   CategoryId: {
    type: DataTypes.BIGINT,
    field: "category_id"
   },
   coursePricing:{
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: "course_pricing"
   },
   courseDescriptionTitle: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "course_description_title"
   },
   courseDescriptionContent: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "course_descriiption_content"
   },
   courseThumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "course_thumbnail_url"
   },
   hasVideo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
   },
   videoSource: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "video_source"
   },
   videoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "video_url"
   },
   grannysId: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: "ID"
   }
},{
    sequelize: db,
    tableName: "courses",
    modelName: "Course"
});

CategoryModel.hasMany(CourseModel);
CourseModel.belongsTo(CategoryModel);

