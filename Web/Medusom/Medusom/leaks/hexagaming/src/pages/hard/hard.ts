import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService} from '../../providers/share-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-hard',
  templateUrl: 'hard.html'
})
export class HardPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private storage: Storage) {
  }

  readonly possible: Array<string> = [
  "red","yellow","green","blue","brown","grey","purple"
  ];
  readonly red: Array<string> = [
  "LightSalmon","DarkSalmon","LightCoral","IndianRed","Crimson","Red","FireBrick","DarkRed"
  ];
  readonly yellow: Array<string> = [
  "Gold","Yellow","LightYellow","LemonChiffon","PapayaWhip","Moccasin","PaleGoldenRod","Khaki","DarkKhaki"
  ];
  readonly green: Array<string> = [
  "GreenYellow","Chartreuse","LimeGreen","Lime","PaleGreen","SpringGreen","SeaGreen","Green","ForestGreen","YellowGreen","Olive"
  ];
  readonly blue: Array<string> = [
  "Cyan","Aquamarine","Turquoise","SteelBlue","CadetBlue","SkyBlue","RoyalBlue","Blue","Navy"
  ];
  readonly brown: Array<string> = [
  "BurlyWood","GoldenRod","Chocolate","SaddleBrown","Brown","Maroon","Sienna","SandyBrown","DarkGoldenRod"
  ];
  readonly grey: Array<string> = [
  "Gainsboro","Silver","DarkGray","DimGray","Gray","SlateGray","DarkSlateGray","Black"
  ];
  readonly purple: Array<string> = [
  "Orchid","Fuchsia","DarkOrchid","BlueViolet","Purple","MediumPurple","MediumSlateBlue","DarkSlateBlue","Indigo"
  ];

  colorType: string = "";
  point: number = 0;
  bestPoint: boolean;
  readonly nbColors: number[] = [2, 4, 6];
  difficulty: number = 0;
  goodColor: string = "";
  colors: Array<string> = [];
  fail: number = 0;
  record: number;

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateColorCode(type): string {
    switch(type) {
      case "red": {
        return this.red[this.getRandomInt(0, this.red.length - 1)];
      }
      case "blue": {
        return this.blue[this.getRandomInt(0, this.blue.length - 1)];
      }
      case "yellow": {
        return this.yellow[this.getRandomInt(0, this.yellow.length - 1)];
      }
      case "brown": {
        return this.brown[this.getRandomInt(0, this.brown.length - 1)];
      }
      case "green": {
        return this.green[this.getRandomInt(0, this.green.length - 1)];
      }
      case "grey": {
        return this.grey[this.getRandomInt(0, this.grey.length - 1)];
      }
      case "purple": {
        return this.purple[this.getRandomInt(0, this.purple.length - 1)];
      }
    }
  }

  setDifficulty(): number {
    if (this.point === 0 && this.point < 5)   return this.difficulty = 0;
    if (this.point >= 5 && this.point < 10)   return this.difficulty = 1;
    if (this.point >= 10)                     return this.difficulty = 2;
  }
  checkResponse(userChoice: string): void {
    if(userChoice != this.goodColor){
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
  isColorAlreadyChoose(obj: string): boolean {
    if (this.colors.indexOf(obj) !== -1)
    {
      return true;
    }
    return false;
  }
  defineBestScore(): void {
    this.storage.get('bestScoreHard').then((val) => {
      if (val == null || this.point > val) {
        this.storage.set('bestScoreHard', this.point);
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

    let nb_color: number = this.nbColors[this.difficulty];
    let color: string = "";

    this.colorType = this.possible[this.getRandomInt(0, this.possible.length - 1)];
    for(let k:number = 1 ; k <= nb_color; k++){
      do
      {
        color = this.generateColorCode(this.colorType);
      } while(this.isColorAlreadyChoose(color) === true)
      this.colors.push(color);
    }
    this.goodColor = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  goToNavPage(): void {
    this.navCtrl.pop()
  }
  ionViewWillLeave(): void {
    this.navParams.get("parentPage").ngOnInit();
  }
}
