# SkyTerm

A React application for visualizing real-time aircraft data through ADS-B tracking.

## Prerequisites

Before running SkyTerm, ensure you have:

- Node.js (v16 or higher)
- Package manager (npm, pnpm, or yarn)
- [SkyTerm Agent](https://github.com/zjpiazza/skyterm-agent)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/zjpiazza/skyterm.git
cd skyterm
```


2. Install dependencies:
```bash
npm install
```

3. Install and run the SkyTerm Agent:
- Follow the installation instructions at [SkyTerm Agent](https://github.com/zjpiazza/skyterm-agent)


## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

- Real-time aircraft tracking
- Interactive map visualization
- Aircraft information display
- Custom map styling
- WebSocket connection for live updates

## Technologies

- React
- TypeScript
- Vite
- Prisma

## License

[MIT License](LICENSE)