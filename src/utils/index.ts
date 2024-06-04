export function success(data, msg) {
  return {
    code: 0,
    result: data,
    message: msg,
  };
}

export function error(msg) {
  return {
    code: -1,
    message: msg,
  };
}

export function wrapperResponse(p, msg) {
  return p
    .then((data) => success(data, msg))
    .catch((err) => error(err.message));
}
