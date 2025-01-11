# react-router-electron

A lightweight framework to build and run React (with React Router) + Electron applications, using Vite under the hood. Inspired by Nextron but designed for React Router v7.

## Features

- **React Router v7** support
- **Electron** main process handling
- **Vite** for blazing fast development builds
- Simple commands for development and production builds
- Flexible structure — let users keep their own `src` directory, while this package handles the core logic

## Installation

```bash
# npm
npm install --save-dev react-router-electron

# yarn
yarn add -D react-router-electron

# pnpm
pnpm add -D react-router-electron
```

## Usage

### 1. Project Setup

Create your own project with a structure like this:

```
my-app/
├─ package.json
├─ src/
│   ├─ main.ts     // Electron main process code
│   └─ renderer/   // React front-end code (with React Router)
├─ vite.config.ts  // Possibly referencing src/renderer
└─ ...
```

Note: react-router-electron does not enforce a specific structure, but this is a common approach.

### 2. Development

In your package.json, add a script referencing react-router-electron dev command (example):

```json
{
  "scripts": {
    "dev": "react-router-electron dev --root=./src/renderer --electronMain=./dist/main.js"
  }
}
```

- Make sure you compile your main.ts (Electron main process) to dist/main.js or similar before running dev.
- When you run npm run dev, a Vite server will start, and Electron will open a window loading the Vite dev URL.

### 3. Production Build

Add another script for building:

```json
{
  "scripts": {
    "build": "react-router-electron build --root=./src/renderer --outDir=./dist/renderer"
  }
}
```

- This will run Vite to build your React app into dist/renderer, then use electron-builder to package your Electron application.

### 4. Running the Production Build

You can use our Router class (or similar) from react-router-electron in your main process if you like. For example:

```ts
import { app } from "electron";
import { Router } from "react-router-electron";

function main() {
  const router = new Router({
    development: process.env.NODE_ENV === "development",
    devServerURL: process.env.VITE_DEV_SERVER_URL,
  });
  router.start().catch((err) => {
    console.error(err);
    app.quit();
  });
}

app.whenReady().then(main);
```

Tip: Adjust the paths and configurations as needed for your specific setup.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork this repository.
2. Create a new branch: git checkout -b my-feature.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to your branch: git push origin my-feature.
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.
