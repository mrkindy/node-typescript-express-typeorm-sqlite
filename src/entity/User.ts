import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";
import {
    Validate,
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsISO31661Alpha2,
    MaxDate,
    NotEquals,
    IsIn,
    IsEmail,
    ValidateIf,
    IsPhoneNumber
} from "class-validator";
import { EmailValidation } from "../validation/EmailValidation";
import { PhoneValidation } from "../validation/PhoneValidation";
import { Status } from "./Status";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: "blank" })
    first_name: string;

    @Column()
    @IsNotEmpty({ message: "blank" })
    last_name: string;

    @Column()
    @IsNotEmpty({ message: "blank" })
    @IsISO31661Alpha2({ message: "inclusion" })
    country_code: string;
    
    @Column()
    @MinLength(10,{ message: "too_short" })
    @MaxLength(15,{ message: "too_long" })
    @IsNotEmpty({ message: "blank" })
    @Validate(PhoneValidation, { message: "taken" })
    @IsPhoneNumber('ZZ',{ message: "not_a_number" })
    phone_number: string;

    @Column()
    @IsNotEmpty({ message: "blank" })
    @IsIn(['male','female'],{ message: "inclusion" })
    gender: string;

    @Column()
    @IsNotEmpty({ message: "blank" })
    @MaxDate(new Date(),{ message:"in_the_future" })
    birthdate: Date;

    @Column()
    @IsNotEmpty({ message: "blank" })
    @NotEquals("invalid_content_type",{ message: "invalid_content_type" })
    avatar: string;

    @Column()
    @ValidateIf(o => o.email!=""&&o.email!=undefined)
    @Validate(EmailValidation, { message: "taken" })
    @IsEmail(undefined,{ message:"invalid" })
    email: string;

    @OneToMany(type => Status, status => status.user)
    status: Status[];
}
