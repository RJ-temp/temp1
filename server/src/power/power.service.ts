import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(watt:number){
        console.log(`Supplying ${watt} worth of power`);
    }
}
