'use strict';

const ALPHABETS = {
   LATIN:        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
   ENIGMAI_I:    'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
   ENIGMAI_II:   'AJDKSIRUXBLHWTMCQGZNPYFVOE',
   ENIGMAI_III:  'BDFHJLCPRTXVZNYEIWGAKMUSQO',
   M3_ARMY_IV:   'ESOVPZJAYQUIRHXLNFTGKDCMWB',
   M3_ARMY_V:    'VZBRGITYUPSDNHLXAWMJQOFECK'
};

function EnigmaRotor(substitutionAlphabet, initialPosition) {
   let alphabet = substitutionAlphabet;
   let encDict = {};
   let decDict = {};   

   initialPosition ? rotate(initialPosition) : init();

   function init() {
      encDict = buildDictionary(ALPHABETS.LATIN, alphabet);
      decDict = buildDictionary(alphabet, ALPHABETS.LATIN);
   }

   function buildDictionary(keys, values) {
      let result = {};

      for (let index in keys) {
         result[keys[index]] = values[index];
      }

      return result;
   }

   function encode(letter) {
      return encDict[letter];
   };

   function decode(letter) {
      return decDict[letter];
   }

   function rotate(numberOfTimes) {
      numberOfTimes = numberOfTimes || 1;
      let shifts = numberOfTimes % substitutionAlphabet.length;

      alphabet = alphabet.slice(shifts).concat(alphabet.slice(0, shifts));
      init();
   };

   return { encode, decode, rotate };
}

EnigmaRotor.M3_ARMY_IV = function (initialPosition) {
   return EnigmaRotor(ALPHABETS.M3_ARMY_IV, initialPosition);
}

module.exports = EnigmaRotor;