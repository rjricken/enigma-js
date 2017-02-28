'use strict';

function EnigmaScrambler() {
   this.spindle = [];
}

EnigmaScrambler.prototype.pushRotor = function(rotor) {
   if (this.spindle.length > 0) {
      rotor.connectTo(this.spindle[this.spindle.length - 1]);
   }

   this.spindle.push(rotor);
};

EnigmaScrambler.prototype.scramble = function(letter) {
   let scrambledLetter = letter;
   let curRotorIndex = this.spindle.length - 1;

   const head = this.spindle[curRotorIndex];

   while (curRotorIndex >= 0) {
      const rotor = this.spindle[curRotorIndex--];

      scrambledLetter = rotor.encode(scrambledLetter);
   }

   head.rotate();

   return scrambledLetter;
};

EnigmaScrambler.prototype.unscramble = function(letter) {

};

module.exports = EnigmaScrambler;