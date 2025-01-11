import { createServer, InlineConfig } from "vite";
import { spawn } from "child_process";
import { join } from "path";
import { info, error } from "./logger";

interface DevOptions {
  /** 開発用ローカルサーバのポート（Vite） */
  port?: number;
  /** ユーザ側のフロントエンド（React）プロジェクトルート */
  root?: string;
  /** Electronメインプロセスのエントリ (ユーザ側にある main.ts など) */
  electronMain?: string;
}

export async function dev(options: DevOptions = {}): Promise<void> {
  const {
    port = 3000,
    root = process.cwd(),
    electronMain = join(process.cwd(), "src", "main.js"), // ユーザが自前で用意
  } = options;

  try {
    // 1) Vite (React) の開発サーバー起動
    const viteConfig: InlineConfig = {
      root,
      server: {
        port,
      },
    };

    const server = await createServer(viteConfig);
    await server.listen();
    const viteServerPort = server.config.server?.port || port;
    info(`Vite dev server running at http://localhost:${viteServerPort}`);

    // 2) Electron の起動
    info("Starting Electron...");
    const electronPath = require("electron") as unknown as string;

    // ts-node/register が必要なら追加
    const electronProcess = spawn(
      electronPath,
      [
        // もしデバッグしたければ: "--inspect=5858",
        electronMain,
      ],
      {
        env: {
          ...process.env,
          NODE_ENV: "development",
          VITE_DEV_SERVER_URL: `http://localhost:${viteServerPort}`,
        },
        stdio: "inherit",
      },
    );

    electronProcess.on("close", () => {
      server.close();
      process.exit();
    });
  } catch (err: any) {
    error(`Failed to start dev server: ${err}`);
    process.exit(1);
  }
}
