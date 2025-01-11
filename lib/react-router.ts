import { app, BrowserWindow } from "electron";
import { join } from "path";
import { info, error } from "./logger";

/**
 * Electronのメインプロセスで使うクラス
 */
interface RouterOptions {
  development?: boolean;
  devServerURL?: string;
  width?: number;
  height?: number;
}

export class Router {
  private window: BrowserWindow | null = null;
  private options: RouterOptions;

  constructor(options: RouterOptions = {}) {
    this.options = {
      development: false,
      devServerURL: "",
      width: 1200,
      height: 800,
      ...options,
    };
  }

  async start(): Promise<void> {
    try {
      await app.whenReady();
      await this.createWindow();
      this.setupAppEvents();
      info("Electron main process started");
    } catch (err) {
      error(`Failed to start Electron: ${err}`);
      app.quit();
    }
  }

  private async createWindow(): Promise<void> {
    this.window = new BrowserWindow({
      width: this.options.width,
      height: this.options.height,
      webPreferences: {
        contextIsolation: true,
      },
    });

    if (this.options.development && this.options.devServerURL) {
      // 開発モード: Vite サーバーを読み込み
      await this.window.loadURL(this.options.devServerURL);
      this.window.webContents.openDevTools();
    } else {
      // 本番モード: ビルド済みの index.html をロード
      // (ユーザ側のビルドアウトプットに合わせる)
      const indexHtml = join(process.cwd(), "dist", "renderer", "index.html");
      await this.window.loadFile(indexHtml);
    }
  }

  private setupAppEvents(): void {
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", async () => {
      if (!this.window) {
        await this.createWindow();
      }
    });
  }
}
