import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import {getConnection} from "typeorm";
import {User} from "../entity/User";

@ValidatorConstraint({ name: "customPhone", async: false })
export class PhoneValidation implements ValidatorConstraintInterface {

    async validate(phone_number: string, args: ValidationArguments) {
        if(phone_number)
        {
            const userRepository = await getConnection().getRepository(User).count({ where: { phone_number: phone_number }});
            return userRepository?false:true;
        }else{
            return true;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return "taken";
    }

}
