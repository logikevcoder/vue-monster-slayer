new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function() {
      this.monsterHealth -= this.calculateDamage(3, 10);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    special: function() {
      this.monsterHealth -= this.calculateDamage(10, 20);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      }
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      this.playerHealth -= this.calculateDamage(6, 12);
      this.checkWin();
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