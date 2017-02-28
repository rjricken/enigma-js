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

function mappedLetterIndex(alphabet, letter, relativeOffset) {
   return (alphabet.indexOf(letter) + relativeOffset) % alphabet.length;
}

EnigmaRotor.prototype.encode = function(letter) {
   return this.alphabet[mappedLetterIndex(ALPHABETS.LATIN, letter, this.currentOffset)];
};

EnigmaRotor.prototype.decode = function(letter) {
   return ALPHABETS.LATIN[mappedLetterIndex(this.alphabet, letter, -this.currentOffset)];
};

EnigmaRotor.prototype.rotate = function(numberOfTimes = 1) {
   this.currentOffset = (this.currentOffset + numberOfTimes) % this.alphabet.length;
};

EnigmaRotor.prototype.connectTo = function(rotorToTheLeft) {
   this.connectingRotor = rotorToTheLeft;
};

//TODO: refactor this
EnigmaRotor.M3_ARMY_IV = function (initialPosition) {
   return new EnigmaRotor(ALPHABETS.M3_ARMY_IV, initialPosition);
};

module.exports = { ALPHABETS, EnigmaRotor };