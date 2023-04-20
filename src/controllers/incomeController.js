import Income from '../models/income.js';

const incomeController = {

    async insertIncome(req, res) {
        let result = new Income(req.body)
        await result.save()
        console.log('INCOME Document inserted with _id: ', result._id);
        return res.redirect('/')
    },
    async displayIncome(req,res) {
        // console.log('kkkkkkkk',req.headers)
        let [result] = await Income.aggregate([
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
          ])
        console.log('Total Savings:',result.totalAmount)
        return res.json(result.totalAmount)
    }
}
export default incomeController