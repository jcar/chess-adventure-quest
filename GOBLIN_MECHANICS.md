# Goblin Mechanics Explained 👺

## How Goblins Move

Goblins are intelligent enemies that **chase the player**. Here's exactly how they work:

### Movement Rules

1. **Goblins move AFTER the player moves** (turn-based)
2. **One square per turn** - they can only move 1 square orthogonally (up/down/left/right, never diagonally)
3. **Smart pathfinding** - they prioritize horizontal movement, then vertical
4. **Can capture the player** - if a goblin moves onto the player's position, you lose!

### Movement Priority Logic

When it's a goblin's turn to move, it calculates the distance to the player:

```javascript
const dx = playerPosition.x - goblinPosition.x;  // Horizontal distance
const dy = playerPosition.y - goblinPosition.y;  // Vertical distance
```

**Priority 1: Horizontal Movement**
- If the player is to the right (`dx > 0`), goblin moves 1 square right
- If the player is to the left (`dx < 0`), goblin moves 1 square left

**Priority 2: Vertical Movement (only if no horizontal distance)**
- If the player is below (`dy > 0`), goblin moves 1 square down
- If the player is above (`dy < 0`), goblin moves 1 square up

### Visual Examples

#### Example 1: Horizontal Chase
```
Turn 1:                Turn 2 (after player moves):
. . . ♘ .             . . ♘ . .
. . . . .      →      . . . . .
. 👺 . . .             . . 👺 . .
. . . . .             . . . . .
```
Goblin at (1,2) moves right to (2,2) to get closer to Knight at (2,1).

#### Example 2: Vertical Chase (when horizontally aligned)
```
Turn 1:                Turn 2 (after player moves):
. ♘ . . .             . . . . .
. . . . .      →      . ♘ . . .
. 👺 . . .             . 👺 . . .
. . . . .             . . . . .
```
Since Knight and Goblin are in the same column (x=1), goblin moves up to (1,1).

#### Example 3: Blocked Path
```
Turn 1:                Turn 2:
. . . ♘ .             . . ♘ . .
. . 🪙 . .      →      . . 🪙 . .  
. 👺 . . .             . 👺 . . .
. . . . .             . . . . .
```
Goblin wants to move right to (2,2), but there's a coin blocking the path, so it stays put.

#### Example 4: Player Capture!
```
Turn 1:                Turn 2 - GAME OVER!
. . ♘ . .             . ♘ . . .
. 👺 . . .      →      . 👺 . . .
. . . . .             . . . . .
```
Knight moves to (1,0), Goblin moves right to (1,1). Now they're adjacent...

```
Turn 3 (if Knight moves to 1,1):
. . . . .
. 💀 . . .  ← Goblin captures Knight!
. . . . .
```

### What Goblins Can and Cannot Do

✅ **Goblins CAN:**
- Move through empty squares
- Move onto the player's position (capturing them)
- Be captured by the player (if player moves onto goblin's position)
- Move within board boundaries

❌ **Goblins CANNOT:**
- Move diagonally
- Jump over obstacles (coins, slimes, other goblins)
- Move more than 1 square per turn
- Move outside the board

### Strategic Implications

**For the Player:**
1. **Use obstacles** - Position coins, slimes, and other goblins between you and pursuing goblins
2. **Knight advantage** - Knights can jump over obstacles, goblins cannot
3. **Capture timing** - Move onto a goblin's position to defeat it before it can chase you
4. **Corner traps** - Be careful not to get cornered where goblins can surround you

**Goblin Behavior:**
- **Predictable** - You can calculate exactly where a goblin will move next
- **Relentless** - They will always try to get closer if possible
- **Blockable** - Any entity (coin, slime, other goblin) will stop their movement

### Code Implementation

The key function is `calculateGoblinMove()`:

1. **Calculate distance** to player
2. **Try horizontal move** first (if `dx ≠ 0`)
3. **Try vertical move** if no horizontal distance (if `dy ≠ 0`)  
4. **Check if path is clear** (not blocked by coins, slimes, etc.)
5. **Move if valid**, otherwise **stay in place**

After all enemies move, the game checks if any enemy is now on the same position as the player - if so, you lose!

This makes goblins a strategic challenge: they're predictable enough that you can plan around them, but dangerous enough that you need to think several moves ahead.
