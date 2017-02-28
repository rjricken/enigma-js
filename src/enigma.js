'use strict';

const EnigmaRotor = require('./rotor.js').EnigmaRotor;
const EnigmaReflector = require('./reflector.js').EnigmaReflector;

function Enigma (rotorOrder, rotorSettings, plugboardPairs) {
   let self = this;

   function encryptLetter(plainLetter) {
      return EncryptionPipeline(self).start(plainLetter)
         .plugboard()
         .rotors(REGULAR)
         .reflector()
         .rotors(REVERSE)
         .plugboard()
         .extract();
   }

   self.encrypt = function (plaintext) {
      let cyphertext = '';

      for (let index in plaintext) {
         //cyphertext += encryptLetter(a);
         plainLetter = plaintext[index];
         
      }

      return cyphertext;
   }

   
   return self;
}

module.exports = Enigma;