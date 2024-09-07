import { Request, Response } from "express";
import Errand from "./models/errands"


export const getAllErrands = async (req: Request, res: Response) => {
    const data = await Errand.find({}).sort({ createdAt: "desc" });
    const errands = data.map(row => ({
        id: row._id,
        description: row.description,
        status: row.status,
        date: row.updatedAt
    }));
    console.log(errands)
    return res.json({ success: true, errands });
};

export const addErrand = async (req: Request, res: Response) => {
    const { description } = req.body;
    await Errand.create({
        description,
        status: true
    });
    return res.json({ success: true });
};

export const endErrand = async (req: Request, res: Response) => {
    const { id } = req.body;
    await Errand.findByIdAndUpdate(id, {
        status: false
    });
    return res.json({ success: true });
};

export const deleteErrand = async (req: Request, res: Response) => {
    const { id } = req.body;
    await Errand.deleteOne({ _id: id });
    return res.json({ success: true });
};