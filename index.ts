import * as express from 'express';
import routes from './src/routes/UserRoutes';
import { SERVER_PORT } from './src/config/config';
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import * as helmet from "helmet";
import * as cors from "cors";

const app = express();
createConnection().then(connection => {
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    routes(app);

    app.listen(SERVER_PORT, () =>
        console.log(`Hello! Kindy server is running on port ${SERVER_PORT}`)
    );
});
export default app;