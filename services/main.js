import request from "../utils/request";
import { stringify } from"../utils/util"

export function getChargingPiles(data) {
  return request(`/api/qq/qq/qq?${stringify(data)}`)
}

export function searchQrcode(data) {
  return request(`/api/qq/qq?${stringify(data)}`)
}