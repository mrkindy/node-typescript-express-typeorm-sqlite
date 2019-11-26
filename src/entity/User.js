"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var EmailValidation_1 = require("../validation/EmailValidation");
var PhoneValidation_1 = require("../validation/PhoneValidation");
var Status_1 = require("./Status");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty({ message: "blank" }),
        __metadata("design:type", String)
    ], User.prototype, "first_name", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty({ message: "blank" }),
        __metadata("design:type", String)
    ], User.prototype, "last_name", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty({ message: "blank" }),
        class_validator_1.IsISO31661Alpha2({ message: "inclusion" }),
        __metadata("design:type", String)
    ], User.prototype, "country_code", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(10, { message: "too_short" }),
        class_validator_1.MaxLength(15, { message: "too_long" }),
        class_validator_1.IsNotEmpty({ message: "blank" }),
        class_validator_1.Validate(PhoneValidation_1.PhoneValidation, { message: "taken" }),
        class_validator_1.IsPhoneNumber('ZZ', { message: "not_a_number" }),
        __metadata("design:type", String)
    ], User.prototype, "phone_number", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty({ message: "blank" }),
        class_validator_1.IsIn(['male', 'female'], { message: "inclusion" }),
        __metadata("design:type", String)
    ], User.prototype, "gender", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty({ message: "blank" }),
        class_validator_1.MaxDate(new Date(), { message: "in_the_future" }),
        __metadata("design:type", Date)
    ], User.prototype, "birthdate", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty({ message: "blank" }),
        class_validator_1.NotEquals("invalid_content_type", { message: "invalid_content_type" }),
        __metadata("design:type", String)
    ], User.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.ValidateIf(function (o) { return o.email != "" && o.email != undefined; }),
        class_validator_1.Validate(EmailValidation_1.EmailValidation, { message: "taken" }),
        class_validator_1.IsEmail(undefined, { message: "invalid" }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Status_1.Status; }, function (status) { return status.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "status", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
