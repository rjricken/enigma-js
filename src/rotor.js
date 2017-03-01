'use strict';

const ALPHABETS = {
   LATIN:        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
   ENIGMAI_I:    'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
   ENIGMAI_II:   'AJDKSIRUXBLHWTMCQGZNPYFVOE',
   ENIGMAI_III:  'BDFHJLCPRTXVZNYEIWGAKMUSQO',
   M3_ARMY_IV:   'ESOVPZJAYQUIRHXLNFTGKDCMWB',
   M3_ARMY_V:    'VZBRGITYUPSDNHLXAWMJQOFECK'
};

//TODO: build a dictionary with indices to each letter of the alphabet for encode/decode

/**
 * Creates a new Rotor based on the provided substitution alphabet and initial position.
 * @param substitutionAlphabet - the mapping relative to the index of each letter in the Latin alphabet
 * @param initialPosition - the initial position of the rotor (zero based index)
 */
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

/**
 * Encodes a letter using the defined substitution alphabet.
 * @param letter - the letter to be encoded
 * @return the encoded letter
 */
EnigmaRotor.prototype.encode = function(letter) {
   return this.alphabet[mappedLetterIndex(ALPHABETS.LATIN, letter, this.currentOffset)];
};

/**
 * Decodes a letter previously encoded using the defined substitution alphabet.
 * @param letter - the letter to be decoded
 * @return the decoded letter
 */
EnigmaRotor.prototype.decode = function(letter) {
   return ALPHABETS.LATIN[mappedLetterIndex(this.alphabet, letter, -this.currentOffset)];
};

/**
 * Rotates the substitution alphabet.
 * @param numberOfTimes - the number of steps to rotate
 */
EnigmaRotor.prototype.rotate = function(numberOfTimes = 1) {
   this.currentOffset = (this.currentOffset + numberOfTimes) % this.alphabet.length;

   if (this.connectingRotor && this.currentOffset === 0) {
      this.connectingRotor.rotate();
   }
};

/**
 * Connects the rotor with an adjacent rotor (in a spindle), making the connecting rotor
 * rotate one step every time the notching point is reached (usually when a full revolution is made)
 * @param rotorToTheLeft - the rotor to be connected to
 */
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