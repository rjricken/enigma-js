'use strict';

const expect = require('chai').expect;
const EnigmaScrambler = require('../src/scrambler.js');
const EnigmaRotor = require('../src/rotor.js').EnigmaRotor;
const ALPHABETS = require('../src/rotor.js').ALPHABETS;

function encodeWord(scrambler, word) {
   let cipherWord = '';

   for (let index in word) {
      cipherWord += scrambler.scramble(word[index]);
      scrambler.advance();
   }

   return cipherWord;
}

function decodeWord(scrambler, cipherWord) {
   let plainWord = '';

   for (let index in cipherWord) {
      plainWord += scrambler.unscramble(cipherWord[index]);
      scrambler.advance();
   }

   return plainWord;
}

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

         const cipherWord = encodeWord(scrambler, 'MYSTERY');
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

      function createScrambler(alphabets) {
         let scrambler = new EnigmaScrambler();
         alphabets.forEach(alphabet => scrambler.pushRotor(new EnigmaRotor(alphabet)));

         return scrambler;
      }

      it('should scramble same letter according to rotor settings', function() {
         const alphabets = [ALPHABETS.ENIGMAI_III, ALPHABETS.M3_ARMY_IV, ALPHABETS.M3_ARMY_V];
         const scrambler = createScrambler(alphabets);

         const expectedResultSets = ['HDGLTQCUXVAMPBRZJFWINSOEYK'];

         expectedResultSets.forEach(result => {
            for (let index in result) {
               expect(scrambler.scramble(ALPHABETS.LATIN[0]))
                  .to.equal(result[index]);

               scrambler.advance();
            }
         });
      });

      it('should scramble a word according to rotor settings', function() {
         const alphabets = [ALPHABETS.ENIGMAI_III, ALPHABETS.M3_ARMY_IV, ALPHABETS.M3_ARMY_V];
         const scrambler = createScrambler(alphabets);

         let cipherWord = encodeWord(scrambler, 'ANOMALY');
         expect(cipherWord).to.equal('HRJZTJT');

         const unscrambler = createScrambler(alphabets);
         let plainWord = decodeWord(unscrambler, cipherWord);

         expect(plainWord).to.equal('ANOMALY');
      });
      
   });
   
});