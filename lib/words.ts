// lib/words.ts
export interface WordData {
  word: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
}

export const BLOCKCHAIN_WORDS: WordData[] = [
  // EASY (50 words - 4-5 letters)
  { word: 'COIN', difficulty: 'easy', hint: 'Digital currency unit' },
  { word: 'HASH', difficulty: 'easy', hint: 'Cryptographic output' },
  { word: 'NODE', difficulty: 'easy', hint: 'Network participant' },
  { word: 'MINT', difficulty: 'easy', hint: 'Create new tokens' },
  { word: 'BURN', difficulty: 'easy', hint: 'Destroy tokens' },
  { word: 'FORK', difficulty: 'easy', hint: 'Chain split' },
  { word: 'SEED', difficulty: 'easy', hint: 'Wallet recovery phrase' },
  { word: 'SWAP', difficulty: 'easy', hint: 'Exchange tokens' },
  { word: 'POOL', difficulty: 'easy', hint: 'Liquidity reserve' },
  { word: 'STAKE', difficulty: 'easy', hint: 'Lock tokens for rewards' },
  { word: 'TOKEN', difficulty: 'easy', hint: 'Digital asset' },
  { word: 'BLOCK', difficulty: 'easy', hint: 'Data container in chain' },
  { word: 'CHAIN', difficulty: 'easy', hint: 'Linked blocks' },
  { word: 'VAULT', difficulty: 'easy', hint: 'Secure storage' },
  { word: 'WHALE', difficulty: 'easy', hint: 'Large holder' },
  { word: 'YIELD', difficulty: 'easy', hint: 'Returns on investment' },
  { word: 'DEFI', difficulty: 'easy', hint: 'Decentralized finance' },
  { word: 'DAPP', difficulty: 'easy', hint: 'Decentralized application' },
  { word: 'SATS', difficulty: 'easy', hint: 'Smallest Bitcoin unit' },
  { word: 'GWEI', difficulty: 'easy', hint: 'Ethereum gas unit' },
  { word: 'PUNK', difficulty: 'easy', hint: 'Famous NFT collection' },
  { word: 'MEME', difficulty: 'easy', hint: 'Fun token category' },
  { word: 'HODL', difficulty: 'easy', hint: 'Hold your coins' },
  { word: 'FOMO', difficulty: 'easy', hint: 'Fear of missing out' },
  { word: 'MOON', difficulty: 'easy', hint: 'Price going up' },
  { word: 'BEAR', difficulty: 'easy', hint: 'Downward market' },
  { word: 'BULL', difficulty: 'easy', hint: 'Upward market' },
  { word: 'PUMP', difficulty: 'easy', hint: 'Rapid price increase' },
  { word: 'DUMP', difficulty: 'easy', hint: 'Rapid price decrease' },
  { word: 'REKT', difficulty: 'easy', hint: 'Lost all money' },
  { word: 'WAGMI', difficulty: 'easy', hint: "We're all gonna make it" },
  { word: 'NGMI', difficulty: 'easy', hint: 'Not gonna make it' },
  //{ word: 'DYOR', difficulty: 'easy', hint: 'Do your own research' },
  { word: 'SHILL', difficulty: 'easy', hint: 'Promote aggressively' },
  { word: 'AAVE', difficulty: 'easy', hint: 'Lending protocol' },
  { word: 'USDT', difficulty: 'easy', hint: 'Tether stablecoin' },
  { word: 'USDC', difficulty: 'easy', hint: 'Circle stablecoin' },
  { word: 'WETH', difficulty: 'easy', hint: 'Wrapped Ethereum' },
  { word: 'WBTC', difficulty: 'easy', hint: 'Wrapped Bitcoin' },
  { word: 'LINK', difficulty: 'easy', hint: 'Chainlink token' },
  { word: 'MATIC', difficulty: 'easy', hint: 'Polygon token' },
  { word: 'AVAX', difficulty: 'easy', hint: 'Avalanche token' },
  { word: 'ATOM', difficulty: 'easy', hint: 'Cosmos token' },
  { word: 'ALGO', difficulty: 'easy', hint: 'Algorand token' },
  { word: 'NEAR', difficulty: 'easy', hint: 'NEAR Protocol' },
  { word: 'FLOW', difficulty: 'easy', hint: 'Flow blockchain' },
  { word: 'ROSE', difficulty: 'easy', hint: 'Oasis Network' },
  { word: 'RUNE', difficulty: 'easy', hint: 'THORChain token' },
  { word: 'LUNA', difficulty: 'easy', hint: 'Terra token (RIP)' },
  { word: 'APE', difficulty: 'easy', hint: 'Bored Ape token' },

  // MEDIUM (75 words - 6-8 letters)
  { word: 'LEDGER', difficulty: 'medium', hint: 'Transaction record book' },
  { word: 'WALLET', difficulty: 'medium', hint: 'Stores private keys' },
  { word: 'MINING', difficulty: 'medium', hint: 'Creating new blocks' },
  { word: 'NONCE', difficulty: 'medium', hint: 'Number used once' },
  { word: 'MERKLE', difficulty: 'medium', hint: 'Tree data structure' },
  { word: 'ORACLE', difficulty: 'medium', hint: 'External data provider' },
  { word: 'BRIDGE', difficulty: 'medium', hint: 'Cross-chain connector' },
  { word: 'SHARD', difficulty: 'medium', hint: 'Database partition' },
  { word: 'PROOF', difficulty: 'medium', hint: 'Validation mechanism' },
  { word: 'ESCROW', difficulty: 'medium', hint: 'Held funds' },
  { word: 'LAYER', difficulty: 'medium', hint: 'Blockchain scaling tier' },
  { word: 'ROLLUP', difficulty: 'medium', hint: 'L2 scaling solution' },
  { word: 'PLASMA', difficulty: 'medium', hint: 'Ethereum scaling' },
  { word: 'SIDECHAIN', difficulty: 'medium', hint: 'Separate blockchain' },
  { word: 'ATOMIC', difficulty: 'medium', hint: 'All-or-nothing swap' },
  { word: 'SLIPPAGE', difficulty: 'medium', hint: 'Price difference' },
  { word: 'LIQUIDITY', difficulty: 'medium', hint: 'Available funds' },
  { word: 'IMPERMANENT', difficulty: 'medium', hint: 'Temporary LP loss' },
  { word: 'WRAPPED', difficulty: 'medium', hint: 'Token representation' },
  { word: 'FUNGIBLE', difficulty: 'medium', hint: 'Interchangeable' },
  { word: 'GASLESS', difficulty: 'medium', hint: 'No fee transactions' },
  { word: 'MULTISIG', difficulty: 'medium', hint: 'Multiple signatures' },
  { word: 'TIMELOCK', difficulty: 'medium', hint: 'Delayed execution' },
  { word: 'FLASHLOAN', difficulty: 'medium', hint: 'Uncollateralized loan' },
  { word: 'AIRDROP', difficulty: 'medium', hint: 'Free token distribution' },
  { word: 'SNAPSHOT', difficulty: 'medium', hint: 'Balance checkpoint' },
  { word: 'VESTING', difficulty: 'medium', hint: 'Gradual token release' },
  { word: 'WHITELIST', difficulty: 'medium', hint: 'Approved addresses' },
  { word: 'VALIDATOR', difficulty: 'medium', hint: 'Network verifier' },
  { word: 'DELEGATOR', difficulty: 'medium', hint: 'Stakes with validator' },
  { word: 'ETHEREUM', difficulty: 'medium', hint: 'Largest smart contract platform' },
  { word: 'BITCOIN', difficulty: 'medium', hint: 'First cryptocurrency' },
  { word: 'SOLANA', difficulty: 'medium', hint: 'High-speed blockchain' },
  { word: 'POLYGON', difficulty: 'medium', hint: 'Ethereum L2' },
  { word: 'CARDANO', difficulty: 'medium', hint: 'Proof-of-stake chain' },
  { word: 'POLKADOT', difficulty: 'medium', hint: 'Multi-chain protocol' },
  { word: 'AVALANCHE', difficulty: 'medium', hint: 'Fast consensus platform' },
  { word: 'CHAINLINK', difficulty: 'medium', hint: 'Oracle network' },
  { word: 'UNISWAP', difficulty: 'medium', hint: 'Largest DEX' },
  { word: 'PANCAKE', difficulty: 'medium', hint: 'BSC DEX' },
  { word: 'SUSHISWAP', difficulty: 'medium', hint: 'Uniswap fork' },
  { word: 'COMPOUND', difficulty: 'medium', hint: 'Lending protocol' },
  { word: 'MAKER', difficulty: 'medium', hint: 'DAI stablecoin creator' },
  { word: 'CURVE', difficulty: 'medium', hint: 'Stablecoin DEX' },
  { word: 'BALANCER', difficulty: 'medium', hint: 'Multi-token pools' },
  { word: 'YEARN', difficulty: 'medium', hint: 'Yield optimizer' },
  { word: 'SYNTHETIX', difficulty: 'medium', hint: 'Synthetic assets' },
  { word: 'DYDX', difficulty: 'medium', hint: 'Decentralized exchange' },
  { word: 'OPENSEA', difficulty: 'medium', hint: 'NFT marketplace' },
  { word: 'RARIBLE', difficulty: 'medium', hint: 'NFT platform' },
  { word: 'AXIE', difficulty: 'medium', hint: 'Play-to-earn game' },
  { word: 'SANDBOX', difficulty: 'medium', hint: 'Metaverse platform' },
  { word: 'DECENTRALAND', difficulty: 'medium', hint: 'Virtual world' },
  { word: 'METAMASK', difficulty: 'medium', hint: 'Browser wallet' },
  { word: 'PHANTOM', difficulty: 'medium', hint: 'Solana wallet' },
  { word: 'ARBITRUM', difficulty: 'medium', hint: 'Optimistic rollup' },
  { word: 'OPTIMISM', difficulty: 'medium', hint: 'L2 scaling' },
  { word: 'ZKSYNC', difficulty: 'medium', hint: 'Zero-knowledge rollup' },
  { word: 'STARKNET', difficulty: 'medium', hint: 'ZK-rollup L2' },
  { word: 'COSMOS', difficulty: 'medium', hint: 'Internet of blockchains' },
  { word: 'RIPPLE', difficulty: 'medium', hint: 'XRP payment network' },
  { word: 'STELLAR', difficulty: 'medium', hint: 'Payment protocol' },
  { word: 'TEZOS', difficulty: 'medium', hint: 'Self-amending chain' },
  { word: 'ALGORAND', difficulty: 'medium', hint: 'Pure PoS blockchain' },
  { word: 'HEDERA', difficulty: 'medium', hint: 'Hashgraph network' },
  { word: 'FILECOIN', difficulty: 'medium', hint: 'Decentralized storage' },
  { word: 'ARWEAVE', difficulty: 'medium', hint: 'Permanent storage' },
  { word: 'IPFS', difficulty: 'medium', hint: 'Distributed file system' },
  { word: 'GNOSIS', difficulty: 'medium', hint: 'Prediction market' },
  { word: 'LIDO', difficulty: 'medium', hint: 'Liquid staking' },
  { word: 'ROCKET', difficulty: 'medium', hint: 'Decentralized staking' },
  { word: 'FRAX', difficulty: 'medium', hint: 'Algorithmic stablecoin' },
  { word: 'ANCHOR', difficulty: 'medium', hint: 'Terra savings protocol' },
  { word: 'CONVEX', difficulty: 'medium', hint: 'Curve booster' },

  // HARD (75 words - 9+ letters or technical)
  { word: 'CONSENSUS', difficulty: 'hard', hint: 'Agreement mechanism' },
  { word: 'BYZANTINE', difficulty: 'hard', hint: 'Fault tolerance problem' },
  { word: 'SHARDING', difficulty: 'hard', hint: 'Horizontal partitioning' },
  { word: 'SIDECHAINS', difficulty: 'hard', hint: 'Parallel blockchains' },
  { word: 'CRYPTOGRAPHY', difficulty: 'hard', hint: 'Encryption science' },
  { word: 'IMMUTABLE', difficulty: 'hard', hint: 'Cannot be changed' },
  { word: 'PERMISSIONLESS', difficulty: 'hard', hint: 'No approval needed' },
  { word: 'TRUSTLESS', difficulty: 'hard', hint: 'No third party needed' },
  { word: 'DECENTRALIZED', difficulty: 'hard', hint: 'No central authority' },
  { word: 'INTEROPERABILITY', difficulty: 'hard', hint: 'Cross-chain communication' },
  { word: 'FINALITY', difficulty: 'hard', hint: 'Transaction irreversibility' },
  { word: 'VALIDATOR', difficulty: 'hard', hint: 'Block proposer' },
  { word: 'ATTESTATION', difficulty: 'hard', hint: 'Verification signature' },
  { word: 'SLASHING', difficulty: 'hard', hint: 'Validator penalty' },
  { word: 'REBALANCING', difficulty: 'hard', hint: 'Portfolio adjustment' },
  { word: 'FRONTRUNNING', difficulty: 'hard', hint: 'MEV exploitation' },
  { word: 'SANDWICHING', difficulty: 'hard', hint: 'MEV attack type' },
  { word: 'COMPOSABILITY', difficulty: 'hard', hint: 'Protocol combination' },
  { word: 'GOVERNANCE', difficulty: 'hard', hint: 'Decision-making process' },
  { word: 'TOKENOMICS', difficulty: 'hard', hint: 'Token economics' },
  { word: 'STABLECOIN', difficulty: 'hard', hint: 'Pegged cryptocurrency' },
  { word: 'ALGORITHMIC', difficulty: 'hard', hint: 'Code-based mechanism' },
  { word: 'COLLATERALIZED', difficulty: 'hard', hint: 'Backed by assets' },
  { word: 'OVERCOLLATERALIZED', difficulty: 'hard', hint: 'Excess backing' },
  { word: 'LIQUIDATION', difficulty: 'hard', hint: 'Forced position close' },
  { word: 'PERPETUAL', difficulty: 'hard', hint: 'No expiry contract' },
  { word: 'DERIVATIVES', difficulty: 'hard', hint: 'Financial contracts' },
  { word: 'SYNTHETIC', difficulty: 'hard', hint: 'Artificial asset' },
  { word: 'REPLICATION', difficulty: 'hard', hint: 'Asset mirroring' },
  { word: 'FRAGMENTATION', difficulty: 'hard', hint: 'Liquidity splitting' },
  { word: 'AGGREGATOR', difficulty: 'hard', hint: 'Multi-source combiner' },
  { word: 'ZKROLLUP', difficulty: 'hard', hint: 'Zero-knowledge scaling' },
  { word: 'OPTIMISTIC', difficulty: 'hard', hint: 'Fraud-proof rollup' },
  { word: 'ZEROKNOWLEDGE', difficulty: 'hard', hint: 'Privacy proof system' },
  { word: 'THRESHOLD', difficulty: 'hard', hint: 'Minimum requirement' },
  { word: 'ELLIPTIC', difficulty: 'hard', hint: 'Curve cryptography' },
  { word: 'ASYMMETRIC', difficulty: 'hard', hint: 'Public-private keys' },
  { word: 'SIGNATURE', difficulty: 'hard', hint: 'Digital authentication' },
  { word: 'SCHNORR', difficulty: 'hard', hint: 'Signature scheme' },
  { word: 'PEDERSEN', difficulty: 'hard', hint: 'Commitment scheme' },
  { word: 'POLYNOMIAL', difficulty: 'hard', hint: 'Mathematical function' },
  { word: 'ACCUMULATOR', difficulty: 'hard', hint: 'Set membership proof' },
  { word: 'VECTORCOMMITMENT', difficulty: 'hard', hint: 'Batch proof structure' },
  { word: 'VERKLETREE', difficulty: 'hard', hint: 'Ethereum upgrade' },
  { word: 'PROPOSERBUILDER', difficulty: 'hard', hint: 'PBS separation' },
  { word: 'MAXIMALVALUE', difficulty: 'hard', hint: 'MEV full term' },
  { word: 'REORDERING', difficulty: 'hard', hint: 'Transaction manipulation' },
  { word: 'CENSORSHIP', difficulty: 'hard', hint: 'Transaction blocking' },
  { word: 'RESISTANCE', difficulty: 'hard', hint: 'Anti-censorship property' },
  { word: 'LIVENESS', difficulty: 'hard', hint: 'Always progressing' },
  { word: 'AVAILABILITY', difficulty: 'hard', hint: 'Data accessibility' },
  { word: 'SAMPLING', difficulty: 'hard', hint: 'Random data checking' },
  { word: 'ERASURECODING', difficulty: 'hard', hint: 'Data redundancy' },
  { word: 'DANKSHARDING', difficulty: 'hard', hint: 'Ethereum sharding' },
  { word: 'PROTODANKSHARDING', difficulty: 'hard', hint: 'EIP-4844' },
  { word: 'BLOBSPACE', difficulty: 'hard', hint: 'Data availability layer' },
  { word: 'CALLDATA', difficulty: 'hard', hint: 'Transaction input data' },
  { word: 'STATELESS', difficulty: 'hard', hint: 'No state storage needed' },
  { word: 'WITNESS', difficulty: 'hard', hint: 'State proof data' },
//   { word: 'VERKLEWITNESS', difficulty: 'hard', hint: 'Compact state proof' },
  { word: 'PROPOSER', difficulty: 'hard', hint: 'Block creator' },
  { word: 'BUILDER', difficulty: 'hard', hint: 'Block assembler' },
  { word: 'SEARCHER', difficulty: 'hard', hint: 'MEV opportunity finder' },
  { word: 'SEQUENCER', difficulty: 'hard', hint: 'Transaction orderer' },
  { word: 'PROVER', difficulty: 'hard', hint: 'ZK proof generator' },
  { word: 'VERIFIER', difficulty: 'hard', hint: 'Proof validator' },
  { word: 'AGGREGATION', difficulty: 'hard', hint: 'Combining multiple items' },
  { word: 'RECURSION', difficulty: 'hard', hint: 'Proof of proofs' },
  { word: 'FOLDING', difficulty: 'hard', hint: 'Proof compression' },
  { word: 'SUPERNOVA', difficulty: 'hard', hint: 'Folding scheme' },
  { word: 'PLONK', difficulty: 'hard', hint: 'ZK proof system' },
  { word: 'STARK', difficulty: 'hard', hint: 'Transparent proof' },
  { word: 'GROTH16', difficulty: 'hard', hint: 'Efficient ZK-SNARK' },
  { word: 'BULLETPROOFS', difficulty: 'hard', hint: 'Range proof system' },
];

// Get daily words (one per difficulty)
export function getDailyWords(date: Date): { easy: WordData; medium: WordData; hard: WordData } {
  const daysSinceEpoch = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  
  const easyWords = BLOCKCHAIN_WORDS.filter(w => w.difficulty === 'easy');
  const mediumWords = BLOCKCHAIN_WORDS.filter(w => w.difficulty === 'medium');
  const hardWords = BLOCKCHAIN_WORDS.filter(w => w.difficulty === 'hard');
  
  return {
    easy: easyWords[daysSinceEpoch % easyWords.length],
    medium: mediumWords[daysSinceEpoch % mediumWords.length],
    hard: hardWords[daysSinceEpoch % hardWords.length],
  };
}

// Validate guess
export function checkGuess(guess: string, target: string): ('correct' | 'present' | 'absent')[] {
  const result: ('correct' | 'present' | 'absent')[] = [];
  const targetLetters = target.split('');
  const guessLetters = guess.toUpperCase().split('');
  
  // First pass: mark correct letters
  const used = new Array(targetLetters.length).fill(false);
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < guessLetters.length; i++) {
    if (result[i] === 'correct') continue;
    
    const letterIndex = targetLetters.findIndex((letter, idx) => 
      letter === guessLetters[i] && !used[idx]
    );
    
    if (letterIndex !== -1) {
      result[i] = 'present';
      used[letterIndex] = true;
    } else {
      result[i] = 'absent';
    }
  }
  
  return result;
}