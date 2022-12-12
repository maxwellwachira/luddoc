import { Request, Response } from 'express';

import {
    addLesson,
    findAllLessons,
    findLessonById,
    findLessonByTitle,
} from './lessonService';

const createLesson = async (req: Request, res: Response) => {
    const { lessonTitle, lessonContent, courseId, topicId } = req.body;
    try {
        //check if lesson exists
        const lesson = await findLessonByTitle(lessonTitle.toUpperCase());
        if (lesson) return res.status(400).json({message: "lesson already exists"});
        //Add lesson if does not exists
        const record  = await addLesson({lessonTitle: lessonTitle.toUpperCase(),lessonContent, CourseId: Number(courseId), TopicId: Number(topicId)});
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllLessons = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    const { courseId } = req.params;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;

    try {
        //Find lessons with pagination
        const lessons = await findAllLessons(page, limit, Number(courseId));
        return res.status(200).json(lessons);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


const getAllLessonsInTopic = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    const { topicId } = req.params;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;

    try {
        //Find lessons with pagination
        const lessons = await findAllLessons(page, limit, Number(topicId));
        return res.status(200).json(lessons);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}



const getOneLesson = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const lesson = await findLessonById(Number(id));
        if (!lesson) return res.status(404).json({message: `lesson with id = ${id} does not exists`});
        return res.json(lesson);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateLesson =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { lessonTitle, lessonContent } = req.body;

    try {
        const lesson = await findLessonById(Number(id));
        if (!lesson) return res.status(404).json({message: `lesson with id = ${id} does not exists`});
    
        lesson.update({lessonTitle: lessonTitle.toUpperCase(), lessonContent});
        return res.status(200).json({message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeLesson = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const lesson = await findLessonById(Number(id));
        if (!lesson) return res.status(404).json({message: `lesson with id = ${id} does not exists`});

        const deletedlesson = await lesson.destroy();
        return res.json({record: deletedlesson});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createLesson,
    getAllLessons,
    getAllLessonsInTopic,
    getOneLesson,
    removeLesson,
    updateLesson
};