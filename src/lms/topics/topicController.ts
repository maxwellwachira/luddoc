import { Request, Response } from 'express';

import {
    addTopic,
    findAllTopics,
    findTopicById,
    findTopicByTitle,
} from './topicService';

const createTopic = async (req: Request, res: Response) => {
    const { topicName, courseId } = req.body;
    try {
        //check if topic exists
        const topic = await findTopicByTitle(topicName.toUpperCase());
        if (topic) return res.status(400).json({message: "topic already exists"});
        //Add topic if does not exists
        const record  = await addTopic({topicName: topicName.toUpperCase(), CourseId: Number(courseId)});
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllTopics = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    const { courseId } = req.params;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;

    try {
        //Find topics with pagination
        const topics = await findAllTopics(page, limit, Number(courseId));
        return res.status(200).json(topics);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}



const getOneTopic = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const topic = await findTopicById(Number(id));
        if (!topic) return res.status(404).json({message: `topic with id = ${id} does not exists`});
        return res.json(topic);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateTopic =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { topicName } = req.body;

    try {
        const topic = await findTopicById(Number(id));
        if (!topic) return res.status(404).json({message: `topic with id = ${id} does not exists`});
    
        topic.update({topicName: topicName.toUpperCase()});
        return res.status(200).json({message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeTopic = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const topic = await findTopicById(Number(id));
        if (!topic) return res.status(404).json({message: `topic with id = ${id} does not exists`});

        const deletedtopic = await topic.destroy();
        return res.json({record: deletedtopic});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createTopic,
    getAllTopics,
    getOneTopic,
    removeTopic,
    updateTopic
};