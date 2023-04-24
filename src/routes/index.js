// import express from 'express';
import catfactRouter from './catfactRouter.js'
import incomeRouter from './incomeRouter.js'
import budgetRouter from './budgetRouter.js'
import userauthRouter from './userauthRouter.js'
import chatappRouter from './chatappRouter.js'
import auth from '../middleware/authMid.js'

export default (app) => {
    app.use('/catfacts',catfactRouter),
    app.use('/income',incomeRouter),
    app.use('/budget',budgetRouter),
    app.use('/userauth',userauthRouter)
    app.use('/chatapp',chatappRouter)
}
