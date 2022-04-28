import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { Injectable } from "@angular/core";

@Injectable()
export class ShareService {
  constructor(private socialSharing: SocialSharing, private screenshot: Screenshot) {}

  shareScreenshot(): void {
    this.screenshot.URI(80)
    .then((res) => {
      this.sharePicture(res.URI)
    },
    () => {
      alert('Screenshot failed');
    });
  }

  sharePicture(picture): void {
    this.socialSharing.share('', '', picture).then(() => {},
    () => {
      alert('SocialSharing failed');
    });
  }
}
