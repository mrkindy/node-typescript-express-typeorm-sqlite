import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/config';

const userMiddleware = (req, res, next) => {

    try {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const data = jwt.verify(bearerToken, JWT_SECRET);

            const now = Math.floor(Date.now() / 1000);
            if(data.exp<now)
            {
                res.status(403);
                res.send({"error":"Token Expired","expired":data.exp,"now":now});
            }else{
                req.body.userId = data.id;
                return next();
            }
        }
    } catch(err) {
        res.status(403);
        res.send({"error":"Token Failed"});
    }
}

export default userMiddleware;