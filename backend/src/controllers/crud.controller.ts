import { Request, Response } from "express";
import Errand from "../models/errands"
import { convertToLocalTZ } from "../utils";


export const getAllErrands = async (req: Request, res: Response) => {
    const data = await Errand.aggregate([
        { $sort: { status: 1, createdAt: -1 } }
    ]);
    const errands = data.map(row => ({
        id: row._id,
        description: row.description,
        status: row.status,
        date: convertToLocalTZ(row.updatedAt)
    }));
    return res.json({ success: true, errands });
};

export const addErrand = async (req: Request, res: Response) => {
    const { description } = req.body;
    await Errand.create({
        description,
        status: false
    });
    return res.json({ success: true });
};

export const updateErrandStatus = async (req: Request, res: Response) => {
    
    const { id, status } = req.body;
    console.log(id, status)
    const result = await Errand.findByIdAndUpdate(id, {
        status
    });
    console.log(result)
    return res.json({ success: true });
};

export const deleteErrand = async (req: Request, res: Response) => {
    const { id } = req.body;
    await Errand.deleteOne({ _id: id });
    return res.json({ success: true });
};