import { Injectable } from '@nestjs/common';
import { readFile , writeFile } from "fs/promises";

@Injectable()
export class MessageRepository{
    async findOne(id:string){
        const contents = await readFile('messages.json' , 'utf-8'); 
        const message = JSON.parse(contents);

        return message[id];
    }
    async findAll(){
        const contents = await readFile('messages.json' , 'utf-8'); 
        const message = JSON.parse(contents);

        return message;
    }
    async create(message:string){
        try {
            const contents = await readFile('messages.json', 'utf-8');
            const messages = JSON.parse(contents);
        
            const id = Math.floor(Math.random() * 999); // Implement your own function for generating unique IDs.
        
            messages[id] = { id, message };
            await writeFile('messages.json', JSON.stringify(messages));
          } catch (error) {
            console.error('Error parsing or writing JSON:', error);
            throw new Error('Failed to create message due to JSON error.');
          }
    }
}