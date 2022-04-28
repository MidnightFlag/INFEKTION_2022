import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ShareService } from '../providers/share-service';
import { HardPage } from '../pages/hard/hard';
import { DoomPage } from '../pages/doom/doom';
import { NormalPage } from '../pages/normal/normal';
import { EasyPage } from '../pages/easy/easy';
import { NavPage } from '../pages/nav/nav';
import { RecordPage } from '../pages/record/record';

import { TrophyComponent } from '../components/trophy/trophy';

@NgModule({
  declarations: [
    MyApp,
    EasyPage,
    NormalPage,
    HardPage,
    DoomPage,
    NavPage,
    RecordPage,
    TrophyComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EasyPage,
    NormalPage,
    HardPage,
    DoomPage,
    NavPage,
    RecordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Screenshot,
    ShareService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
