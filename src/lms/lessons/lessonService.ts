import { LessonModel } from "./lessonModel";

interface LessonRegistrationData {
    lessonTitle: string;
    lessonContent: string;
    CourseId: number;
    TopicId: number;
}

const addLesson = async ({TopicId, CourseId, lessonTitle, lessonContent}: LessonRegistrationData) => {
    return await LessonModel.create({
        lessonTitle,
        lessonContent,
        CourseId,
        TopicId
    });
}

const findAllLessons = async (page: number, limit: number, CourseId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await LessonModel.findAndCountAll({
        where:{
            CourseId
        },
        limit,
        offset,
        order: [['id', 'ASC']]
    });
    const totalPages = Math.ceil(count / limit);

    return {
        totalLessons: count,
        totalPages,
        currentPage: page,
        lessons: rows
    };
}

const findLessonByTopic = async (page: number, limit: number, TopicId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await LessonModel.findAndCountAll({
        where:{
            TopicId
        },
        limit,
        offset,
        order: [['id', 'ASC']]
    });
    const totalPages = Math.ceil(count / limit);

    return {
        totalLessons: count,
        totalPages,
        currentPage: page,
        lessons: rows
    };
}


const findLessonById = async (id: number) => {
    return await LessonModel.findOne({
        where: {
            id, 
        }
    });
}

const findLessonByTitle = async (lessonTitle: string) => {
    return await LessonModel.findOne({
        where: {
            lessonTitle
        }
    });
}

export {
    addLesson,
    findAllLessons,
    findLessonById,
    findLessonByTitle,
    findLessonByTopic,           
};