'use strict';

const expect = require('chai').expect;
const EnigmaReflector = require('../src/reflector.js').EnigmaReflector;
const ALPHABETS = require('../src/rotor.js').ALPHABETS;
const MAPPINGS = require('../src/reflector.js').MAPPINGS;

const M3_ARMY_NAVY_D_MAPPING = MAPPINGS.M3_ARMY_NAVY_D;

describe('EnigmaReflector', function() {

   it('should flip letters according to mapping', function() {
      let reflector = EnigmaReflector(M3_ARMY_NAVY_D_MAPPING);

      for (let index in ALPHABETS.LATIN) {
         let flippedLetter = reflector.flip(ALPHABETS.LATIN[index]);
         
         expect(flippedLetter).to.equal(M3_ARMY_NAVY_D_MAPPING[index]);
         expect(reflector.flip(flippedLetter)).to.equal(ALPHABETS.LATIN[index]);
      }
   });

   it ('should create rotor with preconfigured mapping', function() {
      const reflector = EnigmaReflector.M3_ARMY_NAVY_D;

      let flippedLetter = reflector.flip(ALPHABETS.LATIN[0]);
      expect(flippedLetter).to.equal(M3_ARMY_NAVY_D_MAPPING[0]);
      expect(reflector.flip(flippedLetter)).to.equal(ALPHABETS.LATIN[0]);
   });


});