
const auth = {

    verifyAccessToken(req, res, next) {
        console.log('middleware lmao')
        if (!req.headers.authorization) {
            return res.status(401).json({message:"Not Authorized"})
        } else {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            console
        }
        return next()
    }
}
export default auth;