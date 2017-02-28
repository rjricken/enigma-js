'use strict';

const ALPHABETS = require('./rotor.js').ALPHABETS;

const MAPPINGS = {
   M3_ARMY_NAVY_D: 'ZXWVUTSRQYPONMLKIHGFEDCBJA'
};

function EnigmaReflector(mappings) {
   this.pairMappings = new Map();

   for (let index in mappings) {
      this.pairMappings.set(ALPHABETS.LATIN[index], mappings[index]);
   }
}

EnigmaReflector.prototype.flip = function(letter) {
   return this.pairMappings.get(letter);
}

EnigmaReflector.M3_ARMY_NAVY_D = new EnigmaReflector(MAPPINGS.M3_ARMY_NAVY_D);

module.exports = { MAPPINGS, EnigmaReflector };