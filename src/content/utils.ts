export function deepClone(target) {
  if (typeof target !== "object") {
    return target
  }
  if (target instanceof HTMLElement) {
    return target
  }
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (const key in target) {
    cloneTarget[key] = deepClone(target[key])
  }
  return cloneTarget
}
document.querySelector
