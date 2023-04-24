const chatappController = {
    async mainPage (req,res) {
        return res.render('chatapp',{layout:'main.hbs'})
    }
};
export default chatappController;