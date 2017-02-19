'use strict';

const ALPHABETS = require('./rotor.js').ALPHABETS;

const MAPPINGS = {
   M3_ARMY_NAVY_D: 'ZXWVUTSRQYPONMLKIHGFEDCBJA'
};

function EnigmaReflector(mappings) {
   let pairMappings = new Map();

   for (let index in mappings) {
      pairMappings.set(ALPHABETS.LATIN[index], mappings[index]);
   }

   function flip (letter) {
      return pairMappings.get(letter);
   }

   return { flip };
};

EnigmaReflector.M3_ARMY_NAVY_D = EnigmaReflector(MAPPINGS.M3_ARMY_NAVY_D);

module.exports = { MAPPINGS, EnigmaReflector };