import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService} from '../../providers/share-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-doom',
  templateUrl: 'doom.html'
})
export class DoomPage {
  constructor(public navCtrl: NavController, private shareService: ShareService, private storage: Storage) {}

  readonly possible: string = "0123456789ABCDEF";
  point: number = 0;
  bestPoint: boolean;
  readonly nbColors: number[] = [2, 4, 6];
  difficulty: number = 0;
  hexa: string = "#";
  goodColor: string = "";
  colors: Array<string> = [];
  fail: number = 0;
  record: number;

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  isColorAlreadyChoose(obj: string): boolean {
    if (this.colors.indexOf(obj) !== -1)
    {
      return true;
    }
    return false;
  }

  generateColorCode(): string {
    let hexa: string = "#";
    let len: number = this.possible.length - 1;
    
    for(let i: number = 1 ; i <= 6 ; i++){
      let randomInt: number = this.getRandomInt(0, len);
      hexa += this.possible[randomInt];
    }
    return hexa;
  }

  setDifficulty(): number {
    if (this.point === 0 && this.point < 5)  return this.difficulty = 0;
    if (this.point >= 5 && this.point < 10) return this.difficulty = 1;
    if (this.point >= 10)                   return this.difficulty = 2;
  }
  checkResponse(userChoice: string): void{
    if(userChoice != this.goodColor)
    {
      this.wrongResponse();
      return;
    }
    this.point++;
    this.ngOnInit();
  }
  wrongResponse(): void {
    this.fail = 1;
    this.defineBestScore();
  }
  defineBestScore(): void {
    this.storage.get('bestScoreDoom').then((val) => {
      if (val == null || this.point > val) {
        this.storage.set('bestScoreDoom', this.point);
        this.bestPoint = true;
      }
      this.record = val;
    });
  }
  reset(): void {
    this.point = 0;
    this.fail = 0;
    this.bestPoint = false;
  }
  shareScore(): void {
    this.shareService.shareScreenshot();
  }
  ngOnInit(): void {
    if(this.fail === 1) this.reset();

    this.colors = [];
    this.setDifficulty();

    let color:string = "";
    let len: number = this.nbColors[this.difficulty];
    for(let k:number = 1 ; k <= len ; k++){
      do
      {
        color = this.generateColorCode();        
      } while(this.isColorAlreadyChoose(color) === true)
      this.colors.push(color);
    }
    this.goodColor = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  goToNavPage() {
    this.navCtrl.pop()
  }
}
