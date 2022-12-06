import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db } from '../../config/dbconfig';
import { CourseModel } from '../courses/courseModel';

interface TopicAttributes {
    id: number;
    CourseId: number;
    topicName: string;
    topicNumber?: number
}

type TopicCreationAttributes = Optional<TopicAttributes, 'id'>;


export class TopicModel extends Model<TopicAttributes, TopicCreationAttributes> {}


TopicModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   topicName:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   CourseId: {
    type: DataTypes.BIGINT,
    field: "course_id"
   },
   topicNumber : {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "topic_number"
   }
},{
    sequelize: db,
    tableName: "topics",
    modelName: "Topic"
});

CourseModel.hasMany(TopicModel);
TopicModel.belongsTo(CourseModel);