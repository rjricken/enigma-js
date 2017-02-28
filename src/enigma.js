'use strict';

const EnigmaRotor = require('./rotor.js').EnigmaRotor;
const EnigmaReflector = require('./reflector.js').EnigmaReflector;

function Enigma(rotorOrder, rotorSettings, plugboardPairs) {
}

Enigma.prototype.encryptLetter = function(plainLetter) {
   return EncryptionPipeline(self).start(plainLetter)
      .plugboard()
      .rotors(REGULAR)
      .reflector()
      .rotors(REVERSE)
      .plugboard()
      .extract();
};

Enigma.prototype.encrypt = function(plainText) {
   let cyphertext = '';

   for (let index in plaintext) {
      //cyphertext += encryptLetter(a);
      plainLetter = plaintext[index];
      
   }

   return cyphertext;
};

module.exports = Enigma;