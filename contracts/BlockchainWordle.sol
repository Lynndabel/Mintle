// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BlockchainWordle {
    struct GameState {
        uint256 easyWins;
        uint256 mediumWins;
        uint256 hardWins;
        uint256 currentStreak;
        uint256 maxStreak;
        uint256 lastPlayedDay;
        uint256 totalGamesPlayed;
        bool easyCompletedToday;
        bool mediumCompletedToday;
        bool hardCompletedToday;
    }
    
    struct DailyProgress {
        string difficulty; // "easy", "medium", "hard"
        uint8 attemptsUsed;
        uint8 hintsUsed;
        bool completed;
        bool won;
        uint256 completionTime;
    }
    
    mapping(address => GameState) public playerStats;
    mapping(address => mapping(uint256 => DailyProgress)) public dailyProgress; // day => difficulty => progress
    
    address[] public allPlayers;
    mapping(address => bool) public hasPlayed;
    
    event GameCompleted(
        address indexed player,
        string difficulty,
        bool won,
        uint8 attempts,
        uint256 day
    );
    
    event StreakUpdated(
        address indexed player,
        uint256 newStreak,
        uint256 maxStreak
    );
    
    function getCurrentDay() public view returns (uint256) {
        return block.timestamp / 1 days;
    }
    
    function saveProgress(
        string memory difficulty,
        uint8 attemptsUsed,
        uint8 hintsUsed,
        bool completed,
        bool won
    ) external {
        uint256 today = getCurrentDay();
        GameState storage stats = playerStats[msg.sender];
        
        // Track new players
        if (!hasPlayed[msg.sender]) {
            allPlayers.push(msg.sender);
            hasPlayed[msg.sender] = true;
        }
        
        // Save daily progress
        dailyProgress[msg.sender][today] = DailyProgress({
            difficulty: difficulty,
            attemptsUsed: attemptsUsed,
            hintsUsed: hintsUsed,
            completed: completed,
            won: won,
            completionTime: block.timestamp
        });
        
        // Update stats if game completed
        if (completed && won) {
            if (keccak256(bytes(difficulty)) == keccak256(bytes("easy"))) {
                stats.easyWins++;
                stats.easyCompletedToday = true;
            } else if (keccak256(bytes(difficulty)) == keccak256(bytes("medium"))) {
                stats.mediumWins++;
                stats.mediumCompletedToday = true;
            } else if (keccak256(bytes(difficulty)) == keccak256(bytes("hard"))) {
                stats.hardWins++;
                stats.hardCompletedToday = true;
            }
            
            stats.totalGamesPlayed++;
            
            // Update streak
            if (stats.lastPlayedDay == today - 1 || stats.lastPlayedDay == 0) {
                stats.currentStreak++;
                if (stats.currentStreak > stats.maxStreak) {
                    stats.maxStreak = stats.currentStreak;
                }
            } else if (stats.lastPlayedDay < today - 1) {
                stats.currentStreak = 1;
            }
            
            stats.lastPlayedDay = today;
            
            emit GameCompleted(msg.sender, difficulty, won, attemptsUsed, today);
            emit StreakUpdated(msg.sender, stats.currentStreak, stats.maxStreak);
        }
    }
    
    function resetDailyFlags() external {
        uint256 today = getCurrentDay();
        GameState storage stats = playerStats[msg.sender];
        
        if (stats.lastPlayedDay < today) {
            stats.easyCompletedToday = false;
            stats.mediumCompletedToday = false;
            stats.hardCompletedToday = false;
        }
    }
    
    function getPlayerStats(address player) external view returns (
        uint256 easyWins,
        uint256 mediumWins,
        uint256 hardWins,
        uint256 currentStreak,
        uint256 maxStreak,
        uint256 totalGamesPlayed
    ) {
        GameState memory stats = playerStats[player];
        return (
            stats.easyWins,
            stats.mediumWins,
            stats.hardWins,
            stats.currentStreak,
            stats.maxStreak,
            stats.totalGamesPlayed
        );
    }
    
    function getDailyProgress(address player, uint256 day) external view returns (
        string memory difficulty,
        uint8 attemptsUsed,
        uint8 hintsUsed,
        bool completed,
        bool won
    ) {
        DailyProgress memory progress = dailyProgress[player][day];
        return (
            progress.difficulty,
            progress.attemptsUsed,
            progress.hintsUsed,
            progress.completed,
            progress.won
        );
    }
    
    function getLeaderboard(uint256 limit) external view returns (
        address[] memory players,
        uint256[] memory scores
    ) {
        uint256 playerCount = allPlayers.length;
        if (playerCount == 0) {
            return (new address[](0), new uint256[](0));
        }
        
        uint256 returnCount = limit > playerCount ? playerCount : limit;
        
        // Simple sorting (for production, consider off-chain indexing)
        address[] memory sortedPlayers = new address[](playerCount);
        uint256[] memory sortedScores = new uint256[](playerCount);
        
        for (uint256 i = 0; i < playerCount; i++) {
            address player = allPlayers[i];
            GameState memory stats = playerStats[player];
            uint256 score = stats.easyWins + (stats.mediumWins * 2) + (stats.hardWins * 3);
            
            sortedPlayers[i] = player;
            sortedScores[i] = score;
        }
        
        // Bubble sort (inefficient but simple for demo)
        for (uint256 i = 0; i < playerCount - 1; i++) {
            for (uint256 j = 0; j < playerCount - i - 1; j++) {
                if (sortedScores[j] < sortedScores[j + 1]) {
                    // Swap scores
                    uint256 tempScore = sortedScores[j];
                    sortedScores[j] = sortedScores[j + 1];
                    sortedScores[j + 1] = tempScore;
                    
                    // Swap players
                    address tempPlayer = sortedPlayers[j];
                    sortedPlayers[j] = sortedPlayers[j + 1];
                    sortedPlayers[j + 1] = tempPlayer;
                }
            }
        }
        
        // Return top N
        players = new address[](returnCount);
        scores = new uint256[](returnCount);
        
        for (uint256 i = 0; i < returnCount; i++) {
            players[i] = sortedPlayers[i];
            scores[i] = sortedScores[i];
        }
        
        return (players, scores);
    }
    
    function getTotalPlayers() external view returns (uint256) {
        return allPlayers.length;
    }
}