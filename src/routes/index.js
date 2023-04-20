// import express from 'express';
import catfactRouter from './catfactRouter.js'
import incomeRouter from './incomeRouter.js'
import budgetRouter from './budgetRouter.js'
// const router = express.Router();

// router.get('/catfacts',catfactRouter);
// export default router;
export default (app) => {
    app.use('/catfacts',catfactRouter),
    app.use('/income',incomeRouter),
    app.use('/budget',budgetRouter)
}
