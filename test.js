import test from 'ava';
import trimstring from './src';

test('trimstring', t => {
  let result = trimstring(`
    This should all be trimmed,
    after the fact.

    Interpolation is fine of course.
  `);

  let expected = "This should all be trimmed,\nafter the fact.\n\nInterpolation is fine of course.";

  t.is(typeof trimstring, 'function');
  t.is(result, expected);

  // No concatenation
  result = trimstring(`
    This should all be trimmed,
      after the fact.

      <div>Some HTML</div>
Interpolation is fine of course.
  `);

  // NOTE: the whitespace at the end. We don't trim trim that in cases as with
  // above
  expected = '\n    This should all be trimmed,\n      after the fact.\n\n      <div>Some HTML</div>\nInterpolation is fine of course.\n  ';

  t.is(result, expected);

  // No concatenation
  result = trimstring(`



    This should all be trimmed,
      after the fact.
        more stuff here


  `);

  // Preserves intentional linebreaks
  expected = '\n\n\nThis should all be trimmed,\n  after the fact.\n    more stuff here\n\n';

  t.is(result, expected);

  // Works with strings that don't need it
  t.is(trimstring('hey'), 'hey');

  // NOTE: trimstring just trims leading whitespace if given a standard string
  t.is(trimstring('        hey'), 'hey');

  const genHtml = props => {
    return trimstring(`
      <!doctype html>
      <html lang='en'>
        <head>
          <meta charset='utf-8'>
          <title>${props.title}</title>
        </head>
        <body>
          ${props.body}
        </body>
      </html>
    `);
  };

  expected =
`<!doctype html>
<html lang='en'>
  <head>
    <meta charset='utf-8'>
    <title>Trimstring</title>
  </head>
  <body>
    This is my favorite library!
  </body>
</html>`;

  t.is(genHtml({ title: 'Trimstring', body: 'This is my favorite library!' }), expected);

  // For now the way we handle non string values is simply to return them
  t.deepEqual(trimstring({}), {});
  t.is(trimstring(false), false);
  t.deepEqual(trimstring([]), []);
});
