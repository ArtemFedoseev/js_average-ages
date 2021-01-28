'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(person => {
      return Math.ceil(person.died / 100) === century;
    });
  }

  const ages = men.map(({ born, died }) => died - born);

  return ages.reduce((a, b) => a + b) / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const mothers = people.filter(person => person.mother !== null)
      .map(person => person.mother);

    women = women.filter(person => mothers.includes(person.name));
  }

  const ages = women.map(({ born, died }) => died - born);

  return ages.reduce((a, b) => a + b) / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  function getMothersBorn(kid) {
    const mother = people.find(person => person.name === kid.mother);

    return mother.born;
  };

  let kids = people.filter(person => person.mother !== null);

  if (onlyWithSon) {
    kids = kids.filter(person => person.sex === 'm');
  }

  // Some kids have mothers that are not in DB, let's filter them out
  kids = kids.filter(kid => people.some(person => {
    return person.name === kid.mother;
  }));

  const ageDifferences = kids.map(kid => kid.born - getMothersBorn(kid));

  return ageDifferences.reduce((a, b) => a + b) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
