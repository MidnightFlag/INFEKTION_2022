import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EasyPage } from '../easy/easy';
import { NormalPage } from '../normal/normal';
import { HardPage } from '../hard/hard';
import { DoomPage } from '../doom/doom';
import { RecordPage } from '../record/record';

@Component({
  selector: 'page-nav',
  templateUrl: 'nav.html',
})
export class NavPage {

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.getBestScore();
  }
  helpEasy: boolean = false;
  helpNormal: boolean = false;
  helpHard: boolean = false;
  helpDoom: boolean = false;

  recordEasy: number;
  recordNormal: number;
  recordHard: number;
  recordDoom: number;

  toggleHelp(difficulty: string){
    switch(difficulty) {
      case "easy": {
        this.helpEasy = !this.helpEasy;
        break;
      }
      case "normal": {
        this.helpNormal = !this.helpNormal;
        break;
      }
      case "hard": {
        this.helpHard = !this.helpHard;
        break;
      }
      case "doom": {
        this.helpDoom = !this.helpDoom;
        break;
      }
    }
  }

  getBestScore(): void {
    this.storage.get('bestScoreEasy').then((val: number) => {
      this.recordEasy = val;
    });
    this.storage.get('bestScoreNormal').then((val: number) => {
      this.recordNormal = val;
    });
    this.storage.get('bestScoreHard').then((val: number) => {
      this.recordHard = val;
    });
    this.storage.get('bestScoreDoom').then((val: number) => {
      this.recordDoom = val;
    });
  }

  @ViewChild(Slides) slides: Slides;
  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  goToEasyPage(): void {
    this.navCtrl.push(EasyPage, { "parentPage": this });
  }
  goToNormalPage(): void {
    this.navCtrl.push(NormalPage, { "parentPage": this });
  }
  goToHardPage(): void {
    this.navCtrl.push(HardPage, { "parentPage": this });
  }
  goToDoomPage(): void {
    this.navCtrl.push(DoomPage, { "parentPage": this });
  }
  goToRecordPage(): void {
    this.navCtrl.push(RecordPage, { "parentPage": this });
  }

  ngOnInit(): void {
    this.getBestScore();
  }
}
