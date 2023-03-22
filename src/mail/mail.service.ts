import { Injectable } from "@nestjs/common";

import {MailerService} from '@nestjs-modules/mailer'
import { Customer } from "src/customer/models/customer.model";


@Injectable()
export class MailService{
    constructor(private mailerService:MailerService){}

    async sendCustomerConfirmation(customer:Customer):Promise<void>{
        const url = `${process.env.API_HOST}/api/customer/activate/${customer}`
        console.log(url);
        await this.mailerService.sendMail({
            to:customer.email,
            subject:'Welcome to Myticket App! Confirm your Email!',
            template:'./confirmation',
            context:{
                name:customer.first_name,
                url,
            },
        })
    }
}