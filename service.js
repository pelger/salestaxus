'use strict';

var seneca = require('seneca')();

function computeTax(net, country, state, city, rate, callback) {
  var total = net * (1 + rate);
  callback(null, {total: total, country: country, state: state, city: city});
}

seneca.add({cmd: 'salestax', country: 'US'}, function(args, callback) {
  computeTax(args.net, 'US', '', '', 0.0, callback);
});

seneca.add({cmd: 'salestax', country: 'US', state: 'NY'}, function(args, callback) {
  var rate = 0.07;

  if ('clothing' === args.category && args.net <= 110) {
    rate = 0.0;
    args.special = true;
  }
  computeTax(args.net, 'US', 'NY', '', rate, callback);
});

seneca.add({cmd: 'salestax', country: 'US', state: 'AL'}, function(args, callback) {
  computeTax(args.net, 'US', 'AL', '', 0.04, callback);
});

seneca.add({cmd: 'salestax', country: 'US', state: 'AL', city: 'M'}, function(args, callback) {
  computeTax(args.net, 'US', 'AL', 'M', 0.10, callback);
});

seneca.listen({host: process.env.SERVICE_HOST, port: process.env.SERVICE_PORT});

