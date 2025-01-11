import { build } from "vite";
import { join } from "path";
import { info, error } from "./logger";

// Vite + electron-builder を使ってビルドする例
const electronBuilder = require("electron-builder");

interface BuildOptions {
  /** React (Vite) プロジェクトのルート (ユーザ側のプロジェクト) */
  root?: string;
  /** Vite でビルドした成果物の出力先 (相対パス) */
  outDir?: string;
}

export async function buildApp(options: BuildOptions = {}): Promise<void> {
  const { root = process.cwd(), outDir = "dist/renderer" } = options;

  try {
    // 1) Vite ビルド (React アプリ)
    info("Building React (Vite) application...");
    await build({
      root,
      build: {
        outDir,
        emptyOutDir: true,
      },
    });
    info("Built React application successfully");

    // 2) Electron ビルド (electron-builder)
    info("Building Electron application...");
    await electronBuilder.build({
      config: {
        directories: {
          output: join(root, "release"),
          app: root,
        },
        files: [outDir + "/**/*", "package.json"],
        extraMetadata: {
          // 事前にユーザー側がトランスパイルしたメインプロセス (dist/main.jsなど) を指定する想定
          main: "dist/main.js",
        },
        mac: {
          category: "public.app-category.developer-tools",
        },
        win: {
          target: "nsis",
        },
        linux: {
          target: "AppImage",
        },
      },
    });
    info("Built Electron application successfully");
  } catch (err: any) {
    error(`Failed to build application: ${err}`);
    process.exit(1);
  }
}
