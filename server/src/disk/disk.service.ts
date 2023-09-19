import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
    constructor(private powerService : PowerService){}
    create(a:number){
        console.log('Drawing 20 watt power');
        this.powerService.supplyPower(20);
        return a;
    }
}
