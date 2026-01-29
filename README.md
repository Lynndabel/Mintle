# ⛓️ Blockchain Wordle - Farcaster Mini App

A blockchain-themed Wordle game built as a Farcaster Mini App with on-chain progress tracking on Base.

## 🎮 Features

- **3 Daily Words**: Easy, Medium, and Hard difficulty levels
- **Smart Hints**: Up to 3 free hints per word
- **On-Chain Progress**: Save your game state to Base blockchain
- **Streak Tracking**: Build and maintain your winning streak
- **Global Leaderboard**: Compete with other players
- **Farcaster Native**: Fully integrated with Farcaster ecosystem

## 🚀 Quick Start

### Prerequisites

```bash
- Node.js 18+ 
- npm or yarn
- Wallet with Base Sepolia ETH for testing
- Farcaster account
```

### Installation

```bash
# Clone or create project
npx create-next-app@latest blockchain-wordle --typescript --tailwind --app

cd blockchain-wordle

# Install dependencies
npm install

# Install additional packages
npm install wagmi viem @tanstack/react-query @farcaster/frame-sdk lucide-react
npm install -D hardhat @nomicfoundation/hardhat-toolbox dotenv
```

### Environment Setup

Create `.env` file:
```bash
PRIVATE_KEY=your_wallet_private_key
BASESCAN_API_KEY=your_basescan_api_key
```

Create `.env.local` file:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address_after_deployment
NEXT_PUBLIC_CHAIN_ID=84532
```

### Smart Contract Deployment

```bash
# Initialize Hardhat
npx hardhat init
# Choose "Create a TypeScript project"

# Compile contract
npm run compile

# Deploy to Base Sepolia
npm run deploy:testnet

# Copy the deployed contract address to .env.local

# Verify on Basescan
npx hardhat verify --network baseSepolia YOUR_CONTRACT_ADDRESS
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy to Production

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - NEXT_PUBLIC_CONTRACT_ADDRESS
# - NEXT_PUBLIC_CHAIN_ID
```

### Register as Farcaster Frame

1. Go to https://warpcast.com/~/developers
2. Create new app
3. Add your production URL
4. Test in Farcaster

## 📁 Project Structure

```
blockchain-wordle/
├── app/
│   ├── api/frame/          # Frame metadata
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main game page
│   ├── providers.tsx       # Wagmi + React Query
│   └── globals.css
├── components/
│   ├── Game.tsx            # Main game logic
│   ├── WordGrid.tsx        # Display guesses
│   ├── Keyboard.tsx        # Virtual keyboard
│   ├── Leaderboard.tsx     # Rankings
│   └── Stats.tsx           # User statistics
├── contracts/
│   ├── BlockchainWordle.sol  # Smart contract
│   └── scripts/deploy.ts     # Deployment script
├── lib/
│   ├── words.ts            # 200+ word database
│   ├── contract.ts         # Contract ABI
│   └── utils.ts            # Helper functions
├── hooks/
│   ├── useGame.ts          # Game state hook
│   └── useContract.ts      # Contract interactions
└── hardhat.config.ts       # Hardhat configuration
```

## 🎯 How to Play

1. **Choose Difficulty**: Easy (4-5 letters), Medium (6-8 letters), or Hard (9+ letters)
2. **Make Guesses**: You have 6 attempts to guess the blockchain word
3. **Use Hints**: Get up to 3 letter reveals per word
4. **Build Streaks**: Play daily to maintain your winning streak
5. **Compete**: Climb the global leaderboard

## 🏆 Scoring System

- Easy word solved: 1 point
- Medium word solved: 2 points
- Hard word solved: 3 points
- Maintain daily streak for bonus multipliers

## 🔗 Smart Contract Features

- **saveProgress()**: Store game completion data
- **getPlayerStats()**: Retrieve user statistics
- **getLeaderboard()**: Fetch top players
- **Streak tracking**: Automatic streak calculation
- **Event logging**: Track all game completions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Solidity, Hardhat, Base
- **Web3**: Wagmi, Viem
- **Integration**: Farcaster Frame SDK
- **State**: React Query

## 📝 Contract Addresses

- **Base Sepolia (Testnet)**: `YOUR_TESTNET_ADDRESS`
- **Base Mainnet**: `YOUR_MAINNET_ADDRESS`

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📄 License

MIT

## 🔗 Links

- [Live App](https://your-app.vercel.app)
- [Farcaster Frame](https://warpcast.com/~/developers/YOUR_FRAME)
- [Base Docs](https://docs.base.org)
- [Farcaster Docs](https://docs.farcaster.xyz)

---

Built with ❤️ for the Farcaster and Base communities