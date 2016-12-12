const _ = require('lodash');

module.exports = {
    emptyLinesAround: (msg) => ('\n' + msg + '\n'),
    emptyLineBefore: (msg) => ('\n' + msg),
    emptyLineAfter: (msg) => (msg + '\n'),
    padToMsgLength: (msg) => _.repeat('=', msg.length)
};