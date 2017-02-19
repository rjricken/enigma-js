'use strict';

const EnigmaRotor = require('./rotor.js');

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

      for (let a in plaintext) {
         cyphertext += encryptLetter(a);
      }

      return cyphertext;
   }

   
   return self;
}

module.exports = Enigma;