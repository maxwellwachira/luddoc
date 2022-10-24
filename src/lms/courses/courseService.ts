import sequelize from "sequelize";
import { CourseModel } from "./courseModel";

interface CourseRegistrationData {
    courseTitle: string;
    coursePricing: number;
    CategoryId: number;
    courseDescriptionTitle: string;
    courseDescriptionContent: string;
    courseThumbnailUrl: string;
    hasVideo: boolean;
    videoSource: string;
    videoUrl: string;
    grannysId: string;
}

const addCourse = async ({courseTitle, CategoryId, coursePricing, courseDescriptionTitle, courseDescriptionContent, courseThumbnailUrl, hasVideo, videoSource, videoUrl, grannysId}: CourseRegistrationData) => {
    return await CourseModel.create({
        courseTitle,
        CategoryId,
        coursePricing,
        courseDescriptionTitle,
        courseDescriptionContent,
        courseThumbnailUrl,
        hasVideo,
        videoSource,
        videoUrl,
        grannysId,
    });
}

const findAllCourses = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await CourseModel.findAndCountAll({
        limit,
        offset
    });
    const totalPages = Math.ceil(count / limit);

    return {
        totalCourses: count,
        totalPages,
        currentPage: page,
        courses: rows
    };
}

const findAllCoursesInCategory = async (page: number, limit: number , CategoryId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await CourseModel.findAndCountAll({
        where: {
            CategoryId
        },
        limit,
        offset
    });
    const totalPages = Math.ceil(count);

    return {
        totalCourses: count,
        totalPages,
        currentPage: page,
        courses: rows
    };
}

const searchCourseByTitle = async (page: number, limit: number, courseTitle: string) => {
    const Op = sequelize.Op;
    const offset = (page - 1) * limit;

    const { count, rows } = await CourseModel.findAndCountAll({
        where: {
            courseTitle: {
                [Op.like]: `%${courseTitle}%`
            }
        },
        limit,
        offset
    });
    const totalPages = Math.ceil(count);

    return {
        totalCourses: count,
        totalPages,
        currentPage: page,
        tutors: rows
    };
}

const findCourseById = async (id: number) => {
    return await CourseModel.findOne({
        where: {
            id, 
        }
    });
}

const findCourseByTitle = async (courseTitle: string) => {
    return await CourseModel.findOne({
        where: {
           courseTitle
        }
    });
}

const editCourse = async () => {

}


export {
    addCourse,
    findAllCourses,
    findAllCoursesInCategory,
    searchCourseByTitle,
    findCourseById,
    findCourseByTitle,
    editCourse
};