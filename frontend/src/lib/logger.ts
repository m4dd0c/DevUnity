const nativeLog = console.log;
const nativeWarn = console.warn;
const nativeErr = console.error;

const info = (...args: unknown[]): void => {
  nativeLog(
    "%cINFO",
    "background:skyblue;color:black;padding: 2px 7px; border-radius: 10px;",
    ...args,
  );
};
const debug = (...args: unknown[]): void => {
  nativeLog(
    "%cDBG",
    "background:yellowgreen;color:black;padding: 2px 7px; border-radius: 10px;",
    ...args,
  );
};
const warn = (...args: unknown[]): void => {
  nativeWarn(
    "%cWRN",
    "background:orange;color:black;padding: 2px 7px; border-radius: 10px;",
    ...args,
  );
};
const err = (...args: unknown[]): void => {
  nativeErr(
    "%cERR",
    "background:red;color:black;padding: 2px 7px; border-radius: 10px;",
    ...args,
  );
};

console.log = info;
console.warn = warn;
console.debug = debug;
console.error = err;
