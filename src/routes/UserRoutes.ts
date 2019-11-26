import userMiddleware from "../middleware/UserMiddleware";
import { storeUser } from "../controllers/UserController";
import { generateUserToken } from "../controllers/AuthController";
import { storeStatus } from "../controllers/UserStatusController";
import * as multer from 'multer';

const routes = (app) => {
    const upload = multer({ dest: './uploads/' });

    app.route('/user')
        .post(upload.single('avatar'), storeUser);

    app.route('/auth/generateToken')
        .post(generateUserToken);

    app.route('/user/storeStatus')
        .post(userMiddleware,storeStatus);
            
}

export default routes;