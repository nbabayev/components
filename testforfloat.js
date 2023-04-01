const decimalAdjust = function (type, value, exp) {
  value = value || 0;
  exp = exp === undefined ? -2 : -Math.abs(exp);

  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return new Error('Invalid arguments');
  }

  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));

  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
};

module.exports = {
  round: function (v, d) {
    return decimalAdjust('round', v, d);
  },
  floor: function (v, d) {
    return decimalAdjust('floor', v, d);
  },
  ceil: function (v, d) {
    return decimalAdjust('ceil', v, d);
  },
};
