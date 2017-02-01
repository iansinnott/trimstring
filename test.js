import test from 'ava';
import trimstring from './src';

test('trimstring', t => {
  const testString = `
    This should all be trimmed,
    after the fact.

    Interpolation is fine of course.
  `;

  t.is(typeof trimstring, 'function');
  t.is(trimstring(testString),
`This should all be trimmed,
after the fact.

Interpolation is fine of course.`);
});
