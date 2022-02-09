//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
const moment = jest.requireActual('moment');

Date.now = () => new Date('2020-12-01T00:00:00Z').getTime();

module.exports = moment;
