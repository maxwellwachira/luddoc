import { TopicModel } from "./topicModel";

interface TopicRegistrationData {
    topicName: string;
    CourseId: number;
    topicNumber?: number;
}

const addTopic = async ({topicName, CourseId, topicNumber}: TopicRegistrationData) => {
    return await TopicModel.create({
        topicName,
        CourseId,
        topicNumber
    });
}

const findAllTopics = async (page: number, limit: number, CourseId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await TopicModel.findAndCountAll({
        where:{
            CourseId
        },
        limit,
        offset,
        order: [['id', 'ASC']]
    });
    const totalPages = Math.ceil(count / limit);

    return {
        totalTopics: count,
        totalPages,
        currentPage: page,
        topics: rows
    };
}


const findTopicById = async (id: number) => {
    return await TopicModel.findOne({
        where: {
            id, 
        }
    });
}

const findTopicByTitle = async (topicName: string) => {
    return await TopicModel.findOne({
        where: {
           topicName
        }
    });
}


export {
    addTopic,
    findAllTopics,
    findTopicById,
    findTopicByTitle,
};