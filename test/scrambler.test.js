'use strict';

const expect = require('chai').expect;
const EnigmaScrambler = require('../src/scrambler.js');
const EnigmaRotor = require('../src/rotor.js').EnigmaRotor;
const ALPHABETS = require('../src/rotor.js').ALPHABETS;

describe('EnigmaScrambler', function() {
   describe('<1 rotor>', function() {
      it('should scramble according to rotor settings', function() {
         const slow = EnigmaRotor.M3_ARMY_IV(0);

         const scrambler = new EnigmaScrambler();
         scrambler.pushRotor(slow);

         for (let i = 0; i < 30; i += 1) {
            expect(scrambler.scramble(ALPHABETS.LATIN[0]))
               .to.equal(ALPHABETS.M3_ARMY_IV[i % ALPHABETS.M3_ARMY_IV.length]);
         }
      });
   })
   
});