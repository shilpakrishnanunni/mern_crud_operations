import Errand from "./models/errands.js"


export const getAllErrands = async (req, res) => {
    const data = await Errand.find({}).sort({ createdAt: "desc" });
    const errands = data.map(row => ({
        id: row._id,
        description: row.description,
        status: row.status,
        date: row.updatedAt
    }));
    return res.json({ success: true, errands });
};

export const addErrand = async (req, res) => {
    const { description } = req.body;
    await Errand.create({
        description,
        status: true
    });
    return res.json({ success: true });
};

export const endErrand = async (req, res) => {
    const { id } = req.body;
    await Errand.findByIdAndUpdate(id, {
        status: false
    });
    return res.json({ success: true });
};

export const deleteErrand = async (req, res) => {
    const { id } = req.body;
    await Errand.deleteOne({ _id: id });
    return res.json({ success: true });
};