import {Request, Response} from "express";
import {validate} from "class-validator";
import {getConnection} from "typeorm";
import {Status} from "../entity/Status";
import {User} from "../entity/User";
import {userPolicy} from "../policy/UserPolicy";

export async function storeStatus(req: Request, res: Response) {
    
    try {
        // creat repository
        const statusRepository = getConnection().getRepository(Status);
        const status = statusRepository.create(req.body);
        // validate request data 
        const errors = await validate(status);

        if (errors.length > 0) { 
            // return errors
            let policy = await userPolicy(errors);
            res.status(400);
            res.send(policy);
        } else {

            const user = await getConnection().getRepository(User).findOne(req.body.userId);
            const saveStatus = new Status();
            
            saveStatus.status = req.body.status;
            saveStatus.user = user;
            
            await getConnection().getRepository(Status).save(saveStatus);
            // return saved row
            res.status(201);
            res.send(saveStatus)
        }
    } catch (err) {
        res.status(400);
    }
}