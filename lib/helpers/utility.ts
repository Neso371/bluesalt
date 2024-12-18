import { DateTime } from "luxon";

export function getCurrentDate() {
  return DateTime.now().setZone('local').toUTC();;
}
