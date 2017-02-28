'use strict';

const expect = require('chai').expect;
const EnigmaRotor = require('../src/rotor.js').EnigmaRotor;
const ALPHABETS = require('../src/rotor.js').ALPHABETS;

const LATIN_ALPHABET = ALPHABETS.LATIN;
const M3_ARMY_IV_ALPHABET = ALPHABETS.M3_ARMY_IV;

describe('EnigmaRotor', function() {

   it('should encode/decode letters according to substitution alphabet', function() {
      const substitutionAlphabet = M3_ARMY_IV_ALPHABET;
      let rotor = new EnigmaRotor(substitutionAlphabet);

      for (let index in LATIN_ALPHABET) {
         let encoded = rotor.encode(LATIN_ALPHABET[index]);

         expect(encoded).to.equal(substitutionAlphabet[index]);
         expect(rotor.decode(encoded)).to.equal(LATIN_ALPHABET[index]);
      }
   });

   it('should rotate the alphabet one position', function() {
      const substitutionAlphabet = M3_ARMY_IV_ALPHABET;
      let rotor = new EnigmaRotor(substitutionAlphabet);

      rotor.rotate();
      let encoded = rotor.encode(LATIN_ALPHABET[0]);

      expect(encoded).to.equal(M3_ARMY_IV_ALPHABET[1]);
      expect(rotor.decode(encoded)).to.equal(LATIN_ALPHABET[0]);
   });

   it('should rotate the alphabet back into its original position', function() {
      const substitutionAlphabet = M3_ARMY_IV_ALPHABET;
      let rotor = new EnigmaRotor(substitutionAlphabet);

      for (let i = 0; i < 26; i += 1) {
         rotor.rotate();
         
         expect(rotor.encode(LATIN_ALPHABET[0]))
            .to.equal(M3_ARMY_IV_ALPHABET[(i + 1) % M3_ARMY_IV_ALPHABET.length]);
      }

      expect(rotor.encode(LATIN_ALPHABET[0])).to.equal(M3_ARMY_IV_ALPHABET[0]);
   });

   it('should create rotor with initial position set', function() {
      const substitutionAlphabet = M3_ARMY_IV_ALPHABET;
      let rotor = new EnigmaRotor(substitutionAlphabet, 10);

      expect(rotor.encode(LATIN_ALPHABET[0])).to.equal(M3_ARMY_IV_ALPHABET[10]);
   });

   it('should create rotor with preconfigured alphabet', function() {
      const m3ArmyIV = EnigmaRotor.M3_ARMY_IV(0);

      expect(m3ArmyIV.encode(LATIN_ALPHABET[0])).to.equal(M3_ARMY_IV_ALPHABET[0]);
   });


});