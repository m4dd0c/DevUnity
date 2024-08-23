// have same object in FE
export const ev = {
  // backend emits
  "b:join": "b:join",
  "b:create": "b:create",
  "b:code_change": "b:code_change",
  "b:code_load": "b:code_load",
  "b:leave": "b:leave",
  "b:code_req": "b:code_req",

  // frontend emits
  "f:join": "f:join",
  "f:code_load": "f:code_load",
  "f:create": "f:create",
  "f:code_change": "f:code_change",
  "f:leave": "f:leave",
  "f:code_req": "f:code_req",
};
