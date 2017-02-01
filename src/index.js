import complement from 'ramda/src/complement';
import isEmpty from 'ramda/src/isEmpty';
import test from 'ramda/src/test';
import compose from 'ramda/src/compose';
import split from 'ramda/src/split';
import filter from 'ramda/src/filter';
import curry from 'ramda/src/curry';
import join from 'ramda/src/join';
import tap from 'ramda/src/tap';
import map from 'ramda/src/map';
import prop from 'ramda/src/prop';
import match from 'ramda/src/match';
import reduce from 'ramda/src/reduce';
import min from 'ramda/src/min';
import both from 'ramda/src/both';
import head from 'ramda/src/head';
import last from 'ramda/src/last';
import { IO } from 'shirt';

import createDebugger from 'debug';

const debug = createDebugger('trimstring:index'); // eslint-disable-line no-unused-vars

const stripLeadingTrailingNewlines = str => {
  const sections = str.split('\n');
  let start = 0
  let stop = undefined;

  if (!/\S/g.test(head(sections))) start = 1;
  if (!/\S/g.test(last(sections))) stop = -1;

  return sections
    .slice(start, stop)
    .join('\n');
};

const notEmpty = complement(isEmpty);
const notJustNewlines = complement(test(/\n+/));

const splitLines = compose(
  filter(notEmpty),
  split(/(\n+)/gm),
  stripLeadingTrailingNewlines
);

const trimLeadingN = curry((n, str) => {
  const matchChars = Array(n).fill('.').join('');
  const re = new RegExp(`^(${matchChars})`, 'gm');
  return str.replace(re, '');
});

const makeHeredoc = n =>
  compose(
    join(''),
    map(trimLeadingN(n)),
    splitLines
  );


const countLeadingWhitespace = compose(
  prop('length'),
  tap(debug),
  head,
  match(/^(\s+)/gm)
);

const getMinLeadingWhitespace = compose(
  reduce(min, Infinity),
  map(countLeadingWhitespace),
  filter(both(notEmpty, notJustNewlines))
);

// FOR some reason the prop('length') call above is getting called, even without
// folding. Something is off here, because this IO has been unable to catch
// anything so far
//
// NOTE: it seems that there should likely be a more simple way to handle this
// logic using .map(makeHereDoc).ap(IO.of(str)) instead of doing it in a
// point-ful fashion.
export default function trimstring(str) {
  return IO.of(str)
    .map(splitLines)
    .map(getMinLeadingWhitespace)
    .map(n =>
      makeHeredoc(n)(str)) // See NOTE
    .fold(() => str, x => x); // Just return original object if the operation failed
};
