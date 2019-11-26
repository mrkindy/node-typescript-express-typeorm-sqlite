import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {validate} from "class-validator";
import {userPolicy} from "../policy/UserPolicy";
import {imageFilter} from '../helpers/utils';

export async function storeUser(req: Request, res: Response) {
    try {
        // prepare data for validation
        if (req.file !== undefined) {
            req.body.avatar =  await imageFilter(req.file);
        }
        if(req.body.birthdate){
            req.body.birthdate =  new Date(req.body.birthdate);
        }
        // creat repository
        const userRepository = getConnection().getRepository(User);
        const user = userRepository.create(req.body);
        // validate request data 
        const errors = await validate(user);

        if (errors.length > 0) { 
            // return errors
            let policy = await userPolicy(errors);
            res.status(400);
            res.send(policy);
        } else {
            // return saved row
            userRepository.save(user);
            res.status(201);
            res.send(user)
        }
    } catch (err) {
        res.status(400);
    }
}