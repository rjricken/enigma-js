'use strict';

function EnigmaScrambler() {
   this.spindle = [];
}

EnigmaScrambler.prototype.pushRotor = function(rotor) {
   this.spindle.push(rotor);
};

EnigmaScrambler.prototype.scramble = function(letter) {
   let scrambledLetter = letter;

   let curRotorIndex = this.spindle.length - 1;

   while (curRotorIndex >= 0) {
      let rotor = this.spindle[curRotorIndex--];

      scrambledLetter = rotor.encode(scrambledLetter);
      rotor.rotate();
   }

   return scrambledLetter;
};

EnigmaScrambler.prototype.unscramble = function(letter) {

};

module.exports = EnigmaScrambler;