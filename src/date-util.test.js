//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
import moment from 'moment';
import DateUtil from './date-util';

describe('DateUtil', () => {
  describe('formatDate', () => {
    it('returns an null when the date is null or undefined.', () => {
      expect(DateUtil.formatDate(null, () => { })).toBeNull();
      expect(DateUtil.formatDate(undefined, () => { })).toBeNull();
    });

    it('returns an null when t is null or undefined.', () => {
      expect(DateUtil.formatDate('2020-01-01', null)).toBeNull();
      expect(DateUtil.formatDate('2020-01-01', undefined)).toBeNull();
    });

    it('returns the translation for "today" if the date is today.', () => {
      expect(DateUtil.formatDate('2020-12-01', (x) => x)).toBe('today');
    });

    it('returns the translation for "yesterday" if the date is yesterday.', () => {
      expect(DateUtil.formatDate('2020-11-30', (x) => x)).toBe('yesterday');
    });

    it('returns the translation for a certain number of days if the date is two days ago.', () => {
      expect(DateUtil.formatDate('2020-11-29', () => '{days} days ago')).toBe('2 days ago');
    });

    it('returns the translation for a certain number of days if the date is three days ago.', () => {
      expect(DateUtil.formatDate('2020-11-28', () => '{days} days ago')).toBe('3 days ago');
    });

    it('returns the translation for a certain number of days if the date is four days ago.', () => {
      expect(DateUtil.formatDate('2020-11-27', () => '{days} days ago')).toBe('4 days ago');
    });

    it('returns the translation for a certain number of days if the date is five days ago.', () => {
      expect(DateUtil.formatDate('2020-11-26', () => '{days} days ago')).toBe('5 days ago');
    });

    it('returns the translation for a certain number of days if the date is six days ago.', () => {
      expect(DateUtil.formatDate('2020-11-25', () => '{days} days ago')).toBe('6 days ago');
    });

    it('returns the date when earlier than six days ago.', () => {
      expect(DateUtil.formatDate('2020-11-24', (x) => x)).toBe('2020-11-24');
    });

    it('returns the date when later than today.', () => {
      expect(DateUtil.formatDate('2020-12-02', (x) => x)).toBe('2020-12-02');
    });
  });

  describe('isToday', () => {
    it('returns false when the date is null or undefined.', () => {
      expect(DateUtil.isToday(null)).toBeFalsy();
      expect(DateUtil.isToday(undefined)).toBeFalsy();
    });

    it('returns false when the date is not today.', () => {
      expect(DateUtil.isToday(moment.utc('2020-12-02', 'YYYY-MM-DD'))).toBeFalsy();
    });

    it('returns false when the date is today.', () => {
      expect(DateUtil.isToday(moment.utc('2020-12-01', 'YYYY-MM-DD'))).toBeTruthy();
    });
  });

  describe('isWithinLastWeek', () => {
    it('returns false when the date is null or undefined.', () => {
      expect(DateUtil.isWithinLastWeek(null)).toBeFalsy();
      expect(DateUtil.isWithinLastWeek(undefined)).toBeFalsy();
    });

    it('returns false when the date is tomorrow.', () => {
      expect(DateUtil.isWithinLastWeek(moment.utc('2020-12-02', 'YYYY-MM-DD'))).toBeFalsy();
    });

    it('returns true when the date is today.', () => {
      expect(DateUtil.isWithinLastWeek(moment.utc('2020-12-01', 'YYYY-MM-DD'))).toBeTruthy();
    });

    it('returns true when the date is yesterday.', () => {
      expect(DateUtil.isWithinLastWeek(moment.utc('2020-11-30', 'YYYY-MM-DD'))).toBeTruthy();
    });

    it('returns true when the date is two days ago.', () => {
      expect(DateUtil.isWithinLastWeek(moment.utc('2020-11-29', 'YYYY-MM-DD'))).toBeTruthy();
    });

    it('returns true when the date is a week ago.', () => {
      expect(DateUtil.isWithinLastWeek(moment.utc('2020-11-25', 'YYYY-MM-DD'))).toBeTruthy();
    });

    it('returns false when the date is more than a week ago.', () => {
      expect(DateUtil.isWithinLastWeek(moment.utc('2020-11-24', 'YYYY-MM-DD'))).toBeFalsy();
    });
  });

  describe('isYesterday', () => {
    it('returns false when the date is null or undefined.', () => {
      expect(DateUtil.isYesterday(null)).toBeFalsy();
      expect(DateUtil.isYesterday(undefined)).toBeFalsy();
    });

    it('returns false when the date is today.', () => {
      expect(DateUtil.isYesterday(moment.utc('2020-12-01', 'YYYY-MM-DD'))).toBeFalsy();
    });

    it('returns false when the date is tomorrow.', () => {
      expect(DateUtil.isYesterday(moment.utc('2020-12-02', 'YYYY-MM-DD'))).toBeFalsy();
    });

    it('returns false when the date is two days ago.', () => {
      expect(DateUtil.isYesterday(moment.utc('2020-11-29', 'YYYY-MM-DD'))).toBeFalsy();
    });

    it('returns true when the date is yesterday.', () => {
      expect(DateUtil.isYesterday(moment.utc('2020-11-30', 'YYYY-MM-DD'))).toBeTruthy();
    });
  });

  describe('isValid', () => {
    it('returns true when the date is valid.', () => {
      expect(DateUtil.isValid('2020-12-01')).toBeTruthy();
    });

    it('returns false when the date is null or undefined.', () => {
      expect(DateUtil.isValid(undefined)).toBeFalsy();
      expect(DateUtil.isValid(null)).toBeFalsy();
    });

    it('returns false when the date is invalid.', () => {
      expect(DateUtil.isValid('invalid')).toBeFalsy();
    });
  });
});
