import { Request, Response } from 'express';
import crypto from "crypto";
import { UploadedFile } from 'express-fileupload';

import {
    addCourse,
    findAllCourses,
    findAllCoursesInCategory,
    searchCourseByTitle,
    findCourseById,
    findCourseByTitle,
} from './courseService';

const createCourse = async (req: Request, res: Response) => {
    const { courseName, CategoryId, amount, descriptionTitle, descriptionContent, hasVideo, videoSource, videoUrl, grannysId } = req.body;
    try {
        //check if course exists
        const course = await findCourseByTitle(courseName);
        if (course) return res.status(400).json({message: "course already exists"});
        // check if file has been uploaded
        if(!req.files) return res.status(400).json({message: "Course Thumbanail cannot be empty"});
        let thumbnail = req.files.file as UploadedFile;
        const fileName = `${crypto.randomUUID()}.${thumbnail.mimetype.split("/")[1]}`;
        const courseThumbnailUrl = `/uploads/courseThumbnails/${fileName}`;
        thumbnail.mv(`public${courseThumbnailUrl}`);
        //Add course if does not exists
        const record  = await addCourse({courseTitle: courseName, CategoryId, coursePricing: amount, courseDescriptionTitle: descriptionTitle, courseDescriptionContent: descriptionContent, courseThumbnailUrl, hasVideo, videoSource, videoUrl, grannysId});
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error", error});
    }
}

const getAllCourses = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;

    try {
        //Find courses with pagination
        const courses = await findAllCourses(page, limit);
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllCoursesInCategory = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    let CategoryId = req.params.categoryId as string;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;

    try {
        //Find courses with pagination
        const students = await findAllCoursesInCategory(page, limit, Number(CategoryId));
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const searchCourse = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    let courseTitle = req.query.courseTitle as string;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;

    try {
        //Find courses with pagination
        const course = await searchCourseByTitle(page, limit, courseTitle);
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getOneCourse = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const course = await findCourseById(Number(id));
        if (!course) return res.status(404).json({message: `course with id = ${id} does not exists`});
        return res.json(course);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateCourse =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { courseName, CategoryId, amount, descriptionTitle, descriptionContent, hasVideo, videoSource, videoUrl, grannysId } = req.body;
    let courseThumbnailUrl;

    try {
        const course = await findCourseById(Number(id));
        if (!course) return res.status(404).json({message: `course with id = ${id} does not exists`});
        //get course object
        const courseObject = course.toJSON();
        if(req.files) {
            let thumbnail = req.files.file as UploadedFile;
            const fileName = `${crypto.randomUUID()}.${thumbnail.mimetype.split("/")[1]}`;
            courseThumbnailUrl = `/uploads/courseThumbnails/${fileName}`;
            thumbnail.mv(`public${courseThumbnailUrl}`);
        } else {
            courseThumbnailUrl = courseObject.courseThumbnailUrl;
        }
        course.set({courseTitle: courseName, CategoryId, coursePricing: amount, courseDescriptionTitle: descriptionTitle, courseDescriptionContent: descriptionContent, courseThumbnailUrl, hasVideo, videoSource, videoUrl, grannysId});
        await course.save();
        return res.status(200).json({message:"success"});
        
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeCourse = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const course = await findCourseById(Number(id));
        if (!course) return res.status(404).json({message: `course with id = ${id} does not exists`});

        const deletedcourse = await course.destroy();
        return res.json({record: deletedcourse});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createCourse,
    getAllCourses,
    getAllCoursesInCategory,
    getOneCourse,
    removeCourse,
    searchCourse,
    updateCourse
};