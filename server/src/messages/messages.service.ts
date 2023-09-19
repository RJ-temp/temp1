import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';

@Injectable()
export class MessagesService {
    constructor(public messagerepo : MessageRepository){}

    findOne(id :string){
        return this.messagerepo.findOne(id);
    }
    findAll(){
        return this.messagerepo.findAll();
    }
    create(message:string){
        return this.messagerepo.create(message);
    }
}
