import request from "../utils/request";
import { stringify } from "../utils/util"

export function login(data) {
  return request(`/api/qq/q/q/q`, {
    method: 'POST',
    data,
  })
}

export function getCurrentUser(data) {
  return request(`/api/q/q/q?${stringify(data)}`)
}
