import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService} from '../../providers/share-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private storage: Storage) {
    this.getBestScore();
  }
  recordEasy: number;
  recordNormal: number;
  recordHard: number;
  recordDoom: number;
  
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

  ngOnInit(): void {
    this.getBestScore();
  }

  goToNavPage(): void {
    this.navCtrl.pop()
  }
}
