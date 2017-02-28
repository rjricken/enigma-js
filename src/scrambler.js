'use strict';

function EnigmaScrambler() {
   let spindle = [];

   function pushRotor(rotor) {
      spindle.push(rotor);
   }

   function scramble(letter) {
      let scrambledLetter = letter;

      let curRotorIndex = spindle.length - 1;

      while (curRotorIndex >= 0) {
         let rotor = spindle[curRotorIndex--];

         scrambledLetter = rotor.encode(scrambledLetter);
         rotor.rotate();
      }

      return scrambledLetter;
   }

   function unscramble() {

   }



   return { pushRotor, scramble, unscramble };
}

module.exports = EnigmaScrambler;