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

   while (curRotorIndex >= 0) {
      const rotor = this.spindle[curRotorIndex--];

      scrambledLetter = rotor.encode(scrambledLetter);
   }

   return scrambledLetter;
};

EnigmaScrambler.prototype.unscramble = function(letter) {
   let unscrambledLetter = letter;
   //console.log("Unscrambling ", letter);
   
   this.spindle.forEach(rotor => {
      //console.log('Alphabet: ', rotor.alphabet.slice(rotor.currentOffset).concat(rotor.alphabet.slice(0, rotor.currentOffset)));
      //console.log('Offset: ', rotor.currentOffset);

      unscrambledLetter = rotor.decode(unscrambledLetter);
      //console.log(" > intermediate step: ", unscrambledLetter);

   });

   return unscrambledLetter;
};

EnigmaScrambler.prototype.advance = function() {
   const head = this.spindle[this.spindle.length - 1];
   head.rotate();
}

module.exports = EnigmaScrambler;