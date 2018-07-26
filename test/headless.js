global.window = global;
global.assert = require('chai').assert;

const firebaseMock = require('firebase-mock')
global.firebase = firebaseMock.MockFirebaseSdk();

require('../src/post2');
require('./post.spec.js');

require('../src/app');
require('./app.spec.js');
