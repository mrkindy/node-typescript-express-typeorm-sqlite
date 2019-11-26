import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import {getConnection} from "typeorm";
import {User} from "../entity/User";

@ValidatorConstraint({ name: "customEmail", async: false })
export class EmailValidation implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments) {
        if(email)
        {
            const userRepository = await getConnection().getRepository(User).count({ where: { email: email }});
            return userRepository?false:true;
        }else{
            return true;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return "taken";
    }

}
