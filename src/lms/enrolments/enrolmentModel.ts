import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db } from '../../config/dbconfig';
import { CourseModel } from '../courses/courseModel';
import { UserModel } from '../../appUsers/users/userModel';

interface EnrolmentAttributes {
    id: number;
    UserId: number;
    CourseId: number;
    progress: number;
    createdAt?: string;
    updatedAt?:string;
}

type EnrolmentCreationAttributes = Optional<EnrolmentAttributes, 'id'>;

export class EnrolmentModel extends Model<EnrolmentAttributes, EnrolmentCreationAttributes> {}

EnrolmentModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   UserId: {
    type: DataTypes.BIGINT,
    field: "student_id"
   },
   CourseId: {
    type: DataTypes.BIGINT,
    field: "course_id"
   },
   progress: {
    type: DataTypes.INTEGER,
    allowNull: true
   },
  
},{
    sequelize: db,
    tableName: "enrolments",
    modelName: "Enrolment"
});

CourseModel.hasMany(EnrolmentModel);
EnrolmentModel.belongsTo(CourseModel);

UserModel.hasMany(EnrolmentModel);
EnrolmentModel.belongsTo(UserModel);


