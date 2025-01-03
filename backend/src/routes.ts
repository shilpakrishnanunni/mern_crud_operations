import { Express, Router } from "express";
import { addErrand, deleteErrand, updateErrandStatus, getAllErrands } from "./controllers/crud.controller";
import { checkEmail, login } from "./controllers/auth.controller";


const mountRoutes = (app: Express) => {
    const router = Router();

    router.get("/check-email", checkEmail);
    router.post("/login", login);

    router.get("/get-all-errands", getAllErrands);
    router.post("/add-errand", addErrand);
    router.patch("/update-errand-status", updateErrandStatus);
    router.delete("/delete-errand", deleteErrand);

    app.use(router);
};

export default mountRoutes;