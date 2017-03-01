'use strict';

const expect = require('chai').expect;
const EnigmaScrambler = require('../src/scrambler.js');
const EnigmaRotor = require('../src/rotor.js').EnigmaRotor;
const ALPHABETS = require('../src/rotor.js').ALPHABETS;

describe('EnigmaScrambler', function() {

   describe('<1 rotor>', function() {

      it('should scramble same letter according to rotor settings', function() {
         const first = EnigmaRotor.M3_ARMY_IV(0);

         const scrambler = new EnigmaScrambler();
         scrambler.pushRotor(first);

         for (let i = 0; i < 30; i += 1) {
            expect(scrambler.scramble(ALPHABETS.LATIN[0]))
               .to.equal(ALPHABETS.M3_ARMY_IV[i % ALPHABETS.M3_ARMY_IV.length]);

            scrambler.advance();
         }
      });

      it('should scramble a word according to rotor settings', function() {
         const scrambler = new EnigmaScrambler();
         scrambler.pushRotor(new EnigmaRotor(ALPHABETS.M3_ARMY_IV));

         const plainWord = 'MYSTERY';
         let cipherWord = '';

         for (let index in plainWord) {
            cipherWord += scrambler.scramble(plainWord[index]);
            scrambler.advance();
         }

         expect(cipherWord).to.equal('RBKCYCP');
      });

   });

   describe('<2 rotors>', function() {

      it('should scramble same letter according to rotor settings', function() {
         const first = EnigmaRotor.M3_ARMY_V(0);
         const second = EnigmaRotor.M3_ARMY_IV(0);

         const scrambler = new EnigmaScrambler();
         scrambler.pushRotor(first);
         scrambler.pushRotor(second);

         const expectedResultSets = [ 
            'GMLOXKPVCAQUWYEDHIJTSRBNFZ',
            'IJXFAVSZKWOPMUCNLTQYDGRHEB',
            'TQAEWZDBVMFSJPKHXYOUNIGLCR'
         ];

         expectedResultSets.forEach(result => {
            for (let index in result) {
               expect(scrambler.scramble(ALPHABETS.LATIN[0]))
                  .to.equal(result[index]);

               expect(scrambler.unscramble(result[index]))
                  .to.equal(ALPHABETS.LATIN[0]);

               scrambler.advance();
            }
         });

      });

   });

   describe('<3 rotors>', function() {

      it('should scramble same letter according to rotor settings', function() {
         const first = new EnigmaRotor(ALPHABETS.ENIGMAI_III);
         const second = new EnigmaRotor(ALPHABETS.M3_ARMY_IV);
         const third = new EnigmaRotor(ALPHABETS.M3_ARMY_V);

         const scrambler = new EnigmaScrambler();
         scrambler.pushRotor(first);
         scrambler.pushRotor(second);
         scrambler.pushRotor(third);

         /*
            LATIN:        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',

            M3_ARMY_V:    'VZBRGITYUPSDNHLXAWMJQOFECK'
            M3_ARMY_IV:   'ESOVPZJAYQUIRHXLNFTGKDCMWB',
            ENIGMAI_III:  'BDFHJLCPRTXVZNYEIWGAKMUSQO',
         */

         const expectedResultSets = [
            'HDGLTQC'
         ];

         expectedResultSets.forEach(result => {
            for (let index in result) {
               expect(scrambler.scramble(ALPHABETS.LATIN[0]))
                  .to.equal(result[index]);

               scrambler.advance();
            }
         });
      });
      
   });
   
});