'use strict';

const LATIN_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const M3_ARMY_IV_ALPHABET = 'ESOVPZJAYQUIRHXLNFTGKDCMWB';

const expect = require('chai').expect;
const EnigmaRotor = require('../src/rotor.js');


describe('Enigma.Rotor', function() {

   it('should encode/decode letters according to substitution alphabet', function() {
      const substitutionAlphabet = M3_ARMY_IV_ALPHABET;
      let rotor = EnigmaRotor(substitutionAlphabet, 0);

      for (let index in LATIN_ALPHABET) {
         let encoded = rotor.encode(LATIN_ALPHABET[index]);

         expect(encoded).to.equal(substitutionAlphabet[index]);
         expect(rotor.decode(encoded)).to.equal(LATIN_ALPHABET[index]);
      }
   });

   it('should rotate the alphabet one position', function() {
      const substitutionAlphabet = M3_ARMY_IV_ALPHABET;
      let rotor = EnigmaRotor(substitutionAlphabet, 0);

      rotor.rotate();
      let encoded = rotor.encode(LATIN_ALPHABET[0]);

      expect(encoded).to.equal(M3_ARMY_IV_ALPHABET[1]);
      expect(rotor.decode(encoded)).to.equal(LATIN_ALPHABET[0]);
   });

   it('should rotate the alphabet back into its original position', function() {
      const substitutionAlphabet = M3_ARMY_IV_ALPHABET;
      let rotor = EnigmaRotor(substitutionAlphabet, 0);

      for (let i = 0; i < 26; i += 1) {
         rotor.rotate();
      }

      expect(rotor.encode(LATIN_ALPHABET[0])).to.equal(M3_ARMY_IV_ALPHABET[0]);
   });

   it('should expose a preconfigured M3 Army rotor #IV', function() {
      const m3ArmyIV = EnigmaRotor.M3_ARMY_IV(0);

      expect(m3ArmyIV.encode(LATIN_ALPHABET[0])).to.equal(M3_ARMY_IV_ALPHABET[0]);
   });


});