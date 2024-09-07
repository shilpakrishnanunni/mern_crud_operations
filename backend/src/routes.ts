import { Express, Router } from "express";
import { addErrand, deleteErrand, endErrand, getAllErrands } from "./controller";


const mountRoutes = (app: Express) => {
    const router = Router();

    router.get("/get-all-errands", getAllErrands);
    router.post("/add-errand", addErrand);
    router.patch("end-errand", endErrand);
    router.delete("delete-errand", deleteErrand);

    app.use(router);
};

export default mountRoutes;