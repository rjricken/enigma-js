'use strict';

const ALPHABETS = {
   LATIN:        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
   ENIGMAI_I:    'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
   ENIGMAI_II:   'AJDKSIRUXBLHWTMCQGZNPYFVOE',
   ENIGMAI_III:  'BDFHJLCPRTXVZNYEIWGAKMUSQO',
   M3_ARMY_IV:   'ESOVPZJAYQUIRHXLNFTGKDCMWB',
   M3_ARMY_V:    'VZBRGITYUPSDNHLXAWMJQOFECK'
};

//TODO: build a dictionary with indices of each letter of the alphabet for encode/decode

function EnigmaRotor(substitutionAlphabet, initialPositionIndex = 0) {
   this.alphabet = substitutionAlphabet;
   this.currentOffset = initialPositionIndex;
}

/**
 * Computes the mapped index of a letter based on the alphabet and its current (rotor rotation) offset.
 * @param alphabet - the source alphabet
 * @param letter - the source letter
 * @param relativeOffset - a signed number expressing the offset relative to encoding or decoding
 * @return the index of the source letter mapped to the target alphabet
 */
function mappedLetterIndex(alphabet, letter, relativeOffset) {
   return (alphabet.length + alphabet.indexOf(letter) + relativeOffset) % alphabet.length;
}

EnigmaRotor.prototype.encode = function(letter) {
   return this.alphabet[mappedLetterIndex(ALPHABETS.LATIN, letter, this.currentOffset)];
};

EnigmaRotor.prototype.decode = function(letter) {
   return ALPHABETS.LATIN[mappedLetterIndex(this.alphabet, letter, -this.currentOffset)];
};

EnigmaRotor.prototype.rotate = function(numberOfTimes = 1) {
   this.currentOffset = (this.currentOffset + numberOfTimes) % this.alphabet.length;

   if (this.connectingRotor && this.currentOffset === 0) {
      this.connectingRotor.rotate();
   }
};

EnigmaRotor.prototype.connectTo = function(rotorToTheLeft) {
   this.connectingRotor = rotorToTheLeft;
};

//TODO: refactor this
EnigmaRotor.M3_ARMY_IV = function (initialPosition) {
   return new EnigmaRotor(ALPHABETS.M3_ARMY_IV, initialPosition);
};

EnigmaRotor.M3_ARMY_V = function (initialPosition) {
   return new EnigmaRotor(ALPHABETS.M3_ARMY_V, initialPosition);
};

module.exports = { ALPHABETS, EnigmaRotor };