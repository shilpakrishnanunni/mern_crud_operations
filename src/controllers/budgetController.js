const budgetController = {
    
    async mainPage(req, res) {

        res.render('budget',{layout:'main'})
        // return res.json('hello')
    }
}


export default budgetController