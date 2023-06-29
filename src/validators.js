import { BUTTON_TYPES, HOURS_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from './constants'

export function isPageValid(currentPage) {
  return Object.keys(NAV_ITEMS).includes(currentPage)
}
export function isTimelineItemValid({ hour }) {
  return isHourValid(hour)
}

export function isHourValid(hour) {
  return typeof isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionsValid)
}

export function isSelectOptionsValid({ value, label }) {
  return isNumber(value) || (isNotEmptyString(value) && isNotEmptyString(label))
}

export function validateTimelineItems(timelineItems) {
  return timelineItems.every(isTimelineItemValid)
}

export function isUndefined(val) {
  return val === undefined
}

export function isNull(val) {
  return val === null
}

export function isNumber(val) {
  return typeof val === 'number'
}

export function isString(val) {
  return typeof val === 'string'
}

export function isUndefinedOrNull(val) {
  return isUndefined(val) || isNull(val)
}
export function isNumberOrNull(val) {
  return typeof isNumber(val) || isNull(val)
}

export function isBetween(val, start, end) {
  return val >= start && val <= end
}

export function isNotEmptyString(string) {
  return isString(string) && string.length > 0
}
export function isActivityValid({ id, name, secondsToComplete }) {
  if (isNull(id)) {
    return true
  }
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}
export function validateActivities(activities) {
  return activities.every(isActivityValid)
}
export function isButtonTypeValid(type) {
  return BUTTON_TYPES.includes(type)
}
export function isSelectValueValid(value) {
  return isNotEmptyString(value) || isNumberOrNull(value)
}
