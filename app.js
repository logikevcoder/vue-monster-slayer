new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },

    attack: function() {
      let damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster for ' + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },

    special: function() {
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster hard for ' + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },

    heal: function() {
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for ' + 10
      });
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      }
      this.monsterAttacks();
    },

    giveUp: function() {
      this.gameIsRunning = false;
    },

    monsterAttacks: function() {
      let damage = this.calculateDamage(6, 12)
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage
      });
    },

    calculateDamage: function(min, max) {
      return damage = Math.max(Math.floor(Math.random() * max) + 1, min); // generate random num between 3 - 10
    },

    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if(confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if(confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
})