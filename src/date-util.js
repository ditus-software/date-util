//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
import moment from 'moment';

/**
 * Contains static methods for working with dates.
 */
class DateUtil {
  /**
   * Returns the date, formatted or as words if recent.
   *
   * @param {moment} date The UTC date.
   * @param {object} t The translation. Any function that accepts a key and
   * returns a translated string may be used.
   * @returns {boolean} Returns the formatted date.
   */
  static formatDate(date, t) {
    if (!date) {
      return null;
    }

    if (!(t instanceof Function)) {
      return null;
    }

    const utcDate = moment.utc(date, 'YYYY-MM-DD');

    let result = '';
    if (this.isToday(utcDate)) {
      result = t('today');
    } else if (this.isYesterday(utcDate)) {
      result = t('yesterday');
    } else if (this.isWithinLastWeek(utcDate)) {
      result = t('withinWeek').replace('{days}', moment.utc().diff(utcDate, 'days'));
    } else {
      result = utcDate.format('YYYY-MM-DD');
    }

    return result;
  }

  /**
   * Returns a value indicating whether the specified date is today or not.
   *
   * @param {moment} date The UTC date.
   * @returns {boolean} Returns true if the date is today; otherwise, false.
   */
  static isToday(date) {
    if (!date) {
      return false;
    }

    const todaysDate = moment().utc();

    return (todaysDate.year() === date.year()
      && todaysDate.month() === date.month()
      && todaysDate.date() === date.date()
    );
  }

  /**
   * Returns a value indicating whether the specified date is within the last week or not.
   *
   * @param {moment} date The UTC date.
   * @returns {boolean} Returns true if the date occurs within the past week; otherwise, false.
   */
  static isWithinLastWeek(date) {
    if (!date) {
      return false;
    }

    const sevenDaysAgo = moment.utc().startOf('day').subtract(6, 'days');
    return date.startOf('day') >= sevenDaysAgo && date.startOf('day') <= moment.utc().startOf('day');
  }

  /**
   * Returns a value indicating whether the specified date is yesterday or not.
   *
   * @param {moment} date The UTC date.
   * @returns {boolean} Returns true if the date is yesterday; otherwise, false.
   */
  static isYesterday(date) {
    if (!date) {
      return false;
    }

    const yesterday = moment.utc().subtract(1, 'days');
    return date.year() === yesterday.year()
      && date.month() === yesterday.month()
      && date.date() === yesterday.date();
  }

  /**
   * Checks if the date is a valid date or not.
   *
   * @param {string} date The date.
   * @returns {boolean} Returns true if the date is a valid date; otherwise, false.
   */
  static isValid(date) {
    return date && new Date(date).toString() !== 'Invalid Date';
  }
}

export default DateUtil;
