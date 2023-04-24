import Users from '../models/users.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const userauthController = {
    async signupPageMain(req, res) {
        return res.render('signup.hbs', { layout: 'main.hbs' })
    },
    async signupForm(req, res) {
        try {
            console.log(req.body)
            const { username, password } = req.body;
            // res.end()
            if (!req.body.username || !req.body.password) {
                res.status(400);
                res.send('invalid details')
            } else {
                // filter users table to see if username exists
                const usernameCheck = await Users.find({ username: { $in: [req.body.username] } }).lean()
                // console.log(usernameCheck)

                if (usernameCheck.length != 0) {
                    console.log('Username', username, 'exists.')
                    // res.redirect('/userauth/main')
                    return res.status(400).send('username exists')
                } else {
                    const encryptedPassword = await bcrypt.hash(password, 10)
                    const result = await Users.create({
                        username,
                        password: encryptedPassword
                    })
                    // await result.save()
                    console.log('Inserted new user with _id:', result.id)
                    return res.redirect('/?signup=success')
                }
            }
        } catch (error) {
            console.log('cryig inside', error)

        }
    },
    async login(req, res) {
        const { username, password } = req.body
        console.log(username, 'trying to log in.')
        const user = await Users.findOne({ username: username })
        // console.log(user)
        if (user) {
            const passwordCheck = await bcrypt.compare(password, user['password'])
            // console.log(passwordCheck)
            if (passwordCheck) {
                let token = jwt.sign({ _id: user['_id'],user: username }, process.env.JWT_TOKEN,{expiresIn:"1h"})
                console.log(token)
                return res.redirect('/budget/main')
            } else {
                return res.status(401).json({ message: 'Wrong password.' })
            }
        } else {
            return res.status(401).json({ message: 'User does not exist.' })
        }
    }
}

export default userauthController