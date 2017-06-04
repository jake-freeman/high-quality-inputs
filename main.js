(function() {
  'use strict';
  function _init() {
    var dice = makeDice(10);

    var container = $('.phone-num');
    renderDice(dice, container);
  }

  function makeDice(num) {
    var dice = [];

    for (let i = 0; i < num; i++) {
      let die = new SimpleDie( { max: 10, zeroBased: true });
      dice.push(die);
    }
    return dice;
  }

  function renderDice(dice, container) {
    // lazy way of doing dashes for now
    var i = 0;
    dice.forEach((die) => {
      i++;
      die.renderTo(container);
      if (!(i % 3) || !(i % 6)) {
        $(container).append($('<span>-</span>'));
      }
      die.startRolling(50);
    });
  }

  //
  // @class SimpleDie
  //
  var SimpleDie = (function() {
    var SimpleDie = function(config) {
      config = config ? config : {};

      config.max = config.max ? config.max : 10;
      var start = config.zeroBased ? 0 : 1;

      this.config = config;

      this._faces = [];
      for (let i = start; i < config.max + start; i++) {
        this._faces.push(i);
      }

      _makeDieEl.call(this);

      this.randomize();
    };

    function _makeDieEl() {
      this._textEl = $('<span class="die-vlaue"></span>');

      this._dieEl = $('<div class="btn btn-secondary"></div>');
      this._dieEl.append(this._textEl);

      // set click handler
      var me = this;
      this._dieEl.click((event) => {
        if (me.rolling) {
          me.stopRolling();
        } else {
          me.startRolling();
        }
      });
    }

    SimpleDie.prototype.getEl = function () {
      return this._dieEl;
    }

    SimpleDie.prototype.renderTo = function (parentEl) {
      console.log(parentEl);
      console.log(this._dieEl);
      $(parentEl).append(this.getEl());
    }

    SimpleDie.prototype.randomize = function () {
      var face = this._faces[Math.floor(Math.random() * this.config.max)];
      this._currentFace = face;
      $(this._textEl).text(String(face));
    }

    SimpleDie.prototype.startRolling = function (time) {
      if (!this._rollInterval) {
        this._rollInterval = time ? time : 100;
      }
      this.rolling = true;
      this._roller = setInterval(() => { this.randomize() }, this._rollInterval);
    }

    SimpleDie.prototype.stopRolling = function () {
      this.rolling = false;
      clearInterval(this._roller);
    }

    SimpleDie.prototype.constructor = SimpleDie;

    return SimpleDie;
  })();

  $(document).ready(() => {
    _init();
  });
}());
