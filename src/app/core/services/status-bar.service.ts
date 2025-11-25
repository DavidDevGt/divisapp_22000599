import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root',
})
export class StatusBarService {

  constructor() {
    this.initializeStatusBar();
  }

  private async initializeStatusBar(): Promise<void> {
    await this.setOverlaysWebView(true);
    await this.setStatusBarStyle('DEFAULT');
  }

  async setStatusBarStyle(style: 'DEFAULT' | 'DARK' | 'LIGHT'): Promise<void> {
    try {
      let statusStyle: Style;
      switch (style) {
        case 'DEFAULT':
          statusStyle = Style.Default;
          break;
        case 'DARK':
          statusStyle = Style.Dark;
          break;
        case 'LIGHT':
          statusStyle = Style.Light;
          break;
        default:
          statusStyle = Style.Default;
      }
      await StatusBar.setStyle({ style: statusStyle });
    } catch (error) {
      console.error('Error setting status bar style:', error);
    }
  }

  async setStatusBarBackgroundColor(color: string): Promise<void> {
    try {
      await StatusBar.setBackgroundColor({ color });
    } catch (error) {
      console.error('Error setting status bar background color:', error);
    }
  }

  async setOverlaysWebView(overlay: boolean): Promise<void> {
    try {
      await StatusBar.setOverlaysWebView({ overlay });
    } catch (error) {
      console.error('Error setting overlays webview:', error);
    }
  }

  async hideStatusBar(): Promise<void> {
    try {
      await StatusBar.hide();
    } catch (error) {
      console.error('Error hiding status bar:', error);
    }
  }

  async showStatusBar(): Promise<void> {
    try {
      await StatusBar.show();
    } catch (error) {
      console.error('Error showing status bar:', error);
    }
  }

  async getInfo(): Promise<any> {
    try {
      return await StatusBar.getInfo();
    } catch (error) {
      console.error('Error getting status bar info:', error);
      return null;
    }
  }
}