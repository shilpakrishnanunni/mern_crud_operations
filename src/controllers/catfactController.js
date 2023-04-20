import mongoose from 'mongoose';
import CatFact from '../models/catfacts.js';

const catfactController = {

    async findOperations(req, res) {
        const count = await CatFact.count();
        let random = Math.floor(Math.random() * count);
        const [fact] = await CatFact.find().skip(random).limit(1).lean();
        return res.send(fact.fact)
    }
}
export default catfactController






