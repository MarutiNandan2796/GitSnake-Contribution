# 🐍 GitSnake Pro

[![Node.js Version](https://img.shields.type/badge/node-22%2B-blue)](https://nodejs.org/)
[![License: MIT](https://img.shields.type/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.type/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.type/badge/Tests-Passing-brightgreen.svg)](https://vitest.dev/)

**GitSnake Pro** is a complete, production-ready developer tool that generates a highly-customizable, beautifully-animated SVG snake that crawls across your GitHub contribution calendar, eating your commits and growing in size. 

Perfect for displaying on your GitHub Profile README!

---

## ✨ Features

- **Adaptive Pathfinding**: Intelligent movement using **A\* Search** to target contributions, falling back to **BFS** and a **Flood-fill survival heuristic** when blocked to prevent self-collision.
- **Pure SVG Animation**: Uses lightweight CSS `@keyframes` animations embedded inside a standalone SVG file. Zero GIFs, zero heavy assets, and zero runtime JavaScript required.
- **Multiple Theme Palettes**: Out-of-the-box support for 9 themes including **Matrix, Cyberpunk, Sakura, Galaxy, Fire, Neon, and Ocean**.
- **8 Custom Skins**: Render your snake as a **Classic Snake, Dragon, Robot, Pacman, Ghost, Fox, Cat, or Dinosaur**, each with its own vector shapes.
- **Dynamic Web Dashboard**: A glassmorphic Express dashboard featuring real-time preview, a custom color theme builder, code embed generators, and **Web Audio synthesised 8-bit retro sounds**.
- **Command Line Tool (CLI)**: Generate SVGs and high-resolution static PNGs directly from your shell.
- **Daily Automated Workflows**: Seamless integration with GitHub Actions to automatically regenerate your snake every day.

---

## 🛠️ Tech Stack

- **Core**: Node.js 22+, TypeScript, ES Modules
- **Server**: Express.js
- **Rendering**: SVG XML templates, `@resvg/resvg-js` (high-fidelity Rust-powered SVG to PNG compiler)
- **Testing**: Vitest (Assertion coverage >90%)
- **Styling**: Cyberpunk Glassmorphic CSS

---

## 📁 Folder Structure

```
github-snake-pro/
├── .github/workflows/
│   └── generate.yml          # GitHub Action for automation
├── src/
│   ├── api/
│   │   └── github.ts         # GraphQL Fetcher & Mock generator
│   ├── cli/
│   │   └── index.ts          # CLI execution layer
│   ├── engine/
│   │   ├── board.ts          # 53x7 grid representation
│   │   ├── pathfinding.ts    # A*, BFS, & Survival algorithms
│   │   └── snake.ts          # Snake state, growth, & history
│   ├── server/
│   │   └── index.ts          # Express server with preview routes
│   ├── svg/
│   │   ├── generator.ts      # Stylesheet & element composer
│   │   └── skins.ts          # Custom head/body/food drawings
│   ├── themes/
│   │   └── index.ts          # Color scheme presets
│   └── utils/
│       ├── canvas.ts         # SVG-to-PNG renderer
│       └── logger.ts         # Formatted logger
├── public/                   # Dashboard frontend files
├── tests/                    # Vitest test suites
├── docs/                     # Technical architecture documentation
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Configuration

Create a `.env` file in the root directory (optional, used for loading real profiles):
```env
GITHUB_TOKEN=your_personal_access_token_here
PORT=3000
```
*Note: If no `GITHUB_TOKEN` is found, the application automatically falls back to generating realistic mock contributions so that everything functions offline and out of the box.*

---

## 💻 Usage

### Command Line (CLI)

Generate animated contribution graphics directly from your terminal:
```bash
# Generate default light and dark classic SVGs
npm run generate -- --user octocat

# Generate custom skin with a neon theme and static PNG export
npm run generate -- --user octocat --skin robot --theme neon --png
```

#### CLI Options
| Flag | Description | Default |
|---|---|---|
| `--user` | GitHub profile username | **Required** |
| `--theme` | Matrix, cyberpunk, neon, ocean, sakura, fire, galaxy, classic-dark, classic-light | `classic-dark` |
| `--skin` | classic, dragon, robot, pacman, ghost, fox, cat, dinosaur | `classic` |
| `--speed` | Tick duration in milliseconds (fast is 80ms, slow is 200ms) | `120` |
| `--png` | Compiles and saves static high-resolution PNG copies | `false` |
| `--out` | Output folder or custom filename | `.` |

---

### Web Dashboard

Run the premium developer dashboard to build themes, listen to retro sounds, and copy embedding codes:
```bash
# Start server in watch mode
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### GitHub Action (Daily Auto-Regeneration)

Add this workflow to your repository (e.g., in `.github/workflows/generate.yml`) to keep your profile README up to date:

```yaml
name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *" # Every day at midnight
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
          
      - run: npm ci
      
      - name: Run Generator
        run: npm run generate -- --user ${{ github.repository_owner }} --png
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Move to output directory
        run: |
          mkdir -p output
          mv github-snake*.svg github-snake*.png output/
          
      - name: Deploy to Output Branch
        uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: output
          keep_history: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Include the generated SVGs in your Profile `README.md` using the following markdown:
```markdown
# My GitHub Profile

![GitSnake](https://raw.githubusercontent.com/<username>/<repo-name>/output/github-snake-dark.svg)
```

---

## 🎨 Themes & Skins

### Preset Themes
- `classic-dark` / `classic-light` (Standard GitHub green)
- `matrix` (Glowing green-black computer code)
- `cyberpunk` (Hot pink, cyan, neon yellow)
- `neon` (Pure black with blue electric accents)
- `sakura` (Soft cherry blossom pinks)
- `fire` (Charcoal ash and orange flames)
- `galaxy` (Deep space purples and teal stars)
- `ocean` (Teal and deep navy)

### Presets Skins
- `classic`: Standard rounded blocks.
- `dragon`: Complete head with horns, snout, scales, and a spiky tail.
- `robot`: Cybernetic visor, metallic plates with rivets, antenna.
- `pacman`: Animated yellow chew head with retro Pacman cherries.
- `ghost`: Translucent fading ghost structure.
- `fox`: Orange cheeks, fluffy coat, white-tipped tail.
- `cat`: Cat ears, whiskers, calico body, curled tail.
- `dinosaur`: T-Rex block snout, tiny teeth, and back spikes.

---

## 🧪 Running Tests

Ensure all pathfinding and SVG engines are performing optimally by running unit tests:
```bash
npm run test
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
