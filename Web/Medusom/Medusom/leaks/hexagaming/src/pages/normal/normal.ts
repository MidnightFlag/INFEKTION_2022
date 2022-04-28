import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService} from '../../providers/share-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-normal',
  templateUrl: 'normal.html',
})
export class NormalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private storage: Storage) {
  }

  readonly possible: Array<string> = [
  "AliceBlue","Aquamarine","Azure","Beige","Black","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Gainsboro","GhostWhite","Gold","GoldenRod","Grey","Green","GreenYellow","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGrey","LightSteelBlue","LightYellow","LimeGreen","Magenta","Maroon","MidnightBlue","Olive","Orange","OrangeRed","Orchid","PaleGreen","PaleTurquoise","PaleVioletRed","Pink","Purple","Red","RoyalBlue","SaddleBrown","Salmon","SeaGreen","Silver","SkyBlue","Snow","SpringGreen","SteelBlue","Teal","Tomato","Turquoise","Violet","White","WhiteSmoke","Yellow","YellowGreen"
  ];
  point: number = 0;
  bestPoint: boolean;
  readonly nbColors: number[] = [2, 4, 6, 8];
  difficulty: number = 0;
  goodColor: string = "";
  color: string;
  colors: Array<string> = [];
  fail: number = 0;
  testcolor: boolean;
  record: number;
  timer: number;
  activeTimer: boolean = false;

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateColorCode(): string {
    this.color = this.possible[this.getRandomInt(0, this.possible.length - 1)];
    return this.color;
  }

  setDifficulty(): number {
    if (this.point === 0 && this.point < 5)    return this.difficulty = 0;
    if (this.point >= 5 && this.point < 10)   return this.difficulty = 1;
    if (this.point >= 10 && this.point < 15)  return this.difficulty = 2;
    if (this.point >= 15)                     return this.difficulty = 3;
  }
  checkResponse(userChoice: string): void {
    this.activeTimer = false;
    if (this.fail == 1) return;
    if(userChoice != this.goodColor)
    {
      this.wrongResponse();
      return;
    } 
    this.point++;
    setTimeout(() => this.ngOnInit(), 10);
  }
  wrongResponse(): void {
    this.fail = 1;
    this.defineBestScore();
  }
  isColorAlreadyChoose(obj: string): boolean {
    if (this.colors.indexOf(obj) !== -1)
    {
      return true;
    }
    return false;
  }
  defineBestScore(): void {
    this.storage.get('bestScoreNormal').then((val) => {
      if (val == null || this.point > val) {
        this.storage.set('bestScoreNormal', this.point);
        this.bestPoint = true;
      }
      this.record = val;
    });
  }
  reset(): void {
    this.point = 0;
    this.fail = 0;
    this.bestPoint = false;
    this.activeTimer = true;
  }
  shareScore(): void {
    this.shareService.shareScreenshot();
  }
  resetTimer(): void {
    var page = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(function(){
      page.wrongResponse();
    },3010);
  }
  resetAnimTimer(): void {
    this.activeTimer = false;
    setTimeout(() => this.ngOnInit(), 10);
  }
  ngOnInit(): void {
    this.activeTimer = true;
    this.resetTimer();

    if(this.fail === 1) this.reset();

    this.colors = [];
    this.setDifficulty();

    let nb_color: number = this.nbColors[this.difficulty];
    let color: string = "";
    for(let k:number = 1 ; k <= nb_color ; k++){
      do
      {
        color = this.generateColorCode();        
      } while(this.isColorAlreadyChoose(color) === true)
      this.colors.push(color);
    }
    this.goodColor = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  ionViewWillLeave(): void {
    this.navParams.get("parentPage").ngOnInit();
    clearTimeout(this.timer);
  }
  goToNavPage(): void {
    this.navCtrl.pop()
  }
}
