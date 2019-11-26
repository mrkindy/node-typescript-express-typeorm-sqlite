import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXP_TIME } from '../config/config';
import {getConnection} from "typeorm";
import {User} from "../entity/User";

export async function generateUserToken(req: Request, res: Response) {
    
    try {
        // validate request data 
        if(!req.body.phone_number)
        {
            const error = {
                errors:{
                    phone_number:
                    [
                        {
                            error:"blank"
                        }
                    ]
                }
            };
            res.status(400);
            res.send(error);
        }
        // authunticate
        const userRepository = await getConnection().getRepository(User).findOne({ where: { phone_number: req.body.phone_number }});
        if(userRepository)
        {
            const payload = {
                exp: Math.floor(Date.now() / 1000) + JWT_EXP_TIME,
                id: userRepository.id,
                phone_number: userRepository.phone_number
            }
            const token = jwt.sign(payload, JWT_SECRET);
            res.send(token);
        }else{
            const error = {
                errors:{
                    phone_number:
                    [
                        {
                            error:"not_exist"
                        }
                    ]
                }
            };
            res.status(401);
            res.send(error);
        }
    } catch (err) {
        res.status(400);
    }
    
}