import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db } from '../../config/dbconfig';
import { CourseModel } from '../courses/courseModel';
import { TopicModel } from '../topics/topicModel';

interface LessonAttributes {
    id: number;
    CourseId: number;
    lessonTitle: string;
    lessonContent: string;
    TopicId: number;
}

type LessonCreationAttributes = Optional<LessonAttributes, 'id'>;


export class LessonModel extends Model<LessonAttributes, LessonCreationAttributes> {}


LessonModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   lessonTitle:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "title"
   },
   CourseId: {
    type: DataTypes.BIGINT,
    field: "course_id"
   },
   lessonContent : {
    type: DataTypes.TEXT,
    allowNull: false,
    field: "content"
   },
   TopicId: {
    type: DataTypes.BIGINT,
    field: "topic_id"
   },
},{
    sequelize: db,
    tableName: "lessons",
    modelName: "Lesson"
});

CourseModel.hasMany(LessonModel);
LessonModel.belongsTo(CourseModel);

TopicModel.hasMany(LessonModel);
LessonModel.belongsTo(TopicModel);