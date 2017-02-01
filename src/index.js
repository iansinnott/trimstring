import R from 'ramda';

const stripLeadingTrailingNewlines = str =>
  str.replace(/(^\n|\n$)/, '');

const notEmpty = R.complement(R.isEmpty);
const notJustNewlines = R.complement(R.test(/\n+/));

const splitLines = R.compose(
  R.filter(notEmpty),
  R.split(/(\n+)/gm),
  stripLeadingTrailingNewlines
);

const trimLeadingN = R.curry((n, str) => {
  const matchChars = Array(n).fill('.').join('');
  const re = new RegExp(`^(${matchChars})`, 'gm');
  return str.replace(re, '');
});

const makeHeredoc = n =>
  R.compose(
    R.join(''),
    R.map(trimLeadingN(n)),
    splitLines
  );


const countLeadingWhitespace = R.compose(
  R.prop('length'),
  R.head,
  R.match(/^(\s+)/gm)
);

const reducer = (agg, x) => {
  const n = countLeadingWhitespace(x);
  return n < agg ? n : agg;
}

const getMinLeadingWhitespace = R.compose(
  R.reduce(R.min, Infinity),
  R.map(countLeadingWhitespace),
  R.filter(R.both(notEmpty, notJustNewlines))
);

const alltogether = str => {
  const n = getMinLeadingWhitespace(splitLines(str));
  return makeHeredoc(n)(str);
};

export default function trimstring(str) {
  return str;
};
