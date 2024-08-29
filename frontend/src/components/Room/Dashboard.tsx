// eslint-disable-next-line
import { useCallback, useEffect, useState } from "react";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
// languages
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-php_laravel_blade";
import "ace-builds/src-noconflict/mode-golang";

import { useSocket } from "../../context/useSocket";
import { useParams } from "react-router-dom";
import { ev } from "../../lib/utils";

// Set the base path for Ace
ace.config.set(
  "basePath",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/",
);

// eslint-disable-next-line
const Dashboard = ({ room, user }: { room?: IRoom; user: IUser | null }) => {
  const { changeCode, socket, code, setCode } = useSocket();
  const { roomId } = useParams();
  const [aceLoaded, setAceLoaded] = useState(false);

  const onChange = (e: any) => {
    if (!roomId) return;
    console.log("onchange");
    setCode(e);
    changeCode({ roomId, code: e });
  };
  // TODO: save code to localstorage with debounce
  // useEffect(() => {
  //   // saving to localstorage debounce
  //   localStorage.setItem('code', JSON.stringify({code: e, roomId}))
  // }, [])

  // fix error: define is not defined
  useEffect(() => {
    // @ts-expect-error 'ace' doesn't exist on window
    if (window.ace) {
      // @ts-expect-error 'ace' doesn't exist on window
      window.define = window?.ace.define;
      // @ts-expect-error 'ace' doesn't exist on window
      window.require = window?.ace.require;
      setAceLoaded(true);
    }
  }, []);

  // code change recieve event
  const recvCodeChange = useCallback(
    ({ code }: { code: string }) => {
      console.log("recv self");
      setCode(code);
    },
    [setCode],
  );

  // requesting code
  const codeReq = useCallback(
    ({ socketId }: { socketId: string }) => {
      if (!socket) return console.log("socket not found");
      socket.emit(ev["f:code_load"], { socketId, code });
    },
    [code, socket],
  );

  // on code change recieve
  useEffect(() => {
    // events handling
    if (!socket) return console.log("socket not found");

    // listeners
    socket.on(ev["b:code_change"], recvCodeChange);
    socket.on(ev["b:code_req"], codeReq);
    socket.on(ev["b:code_load"], recvCodeChange);

    // cleanup function
    return () => {
      socket.off(ev["b:code_change"], recvCodeChange);
      socket.off(ev["b:code_load"], recvCodeChange);
      socket.off(ev["b:code_req"], codeReq);
    };
    // deps
  }, [socket, setCode, recvCodeChange, codeReq, roomId]);

  useEffect(() => {
    if (!socket) return console.log("socket not loaded");
    // emits
    socket.emit(ev["f:code_req"], { roomId });
  }, [roomId, socket]);

  // setting initial code from db;
  useEffect(() => {
    setCode(room?.project.code || "");
  }, []);

  // user not found
  useEffect(() => {
    if (!user) return console.log("user not found!");
  }, [user]);
  return (
    <div className="h-screen w-screen">
      {aceLoaded && (
        <AceEditor
          placeholder="console.log('collabrite is awesome...');"
          mode="typescript"
          style={{ height: "100vh", width: "100%" }}
          theme="monokai"
          name="playground"
          onChange={onChange}
          fontSize={14}
          lineHeight={19}
          showPrintMargin={true}
          showGutter={true}
          value={code}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: true,
            cursorStyle: "smooth",
            highlightActiveLine: true,
            tabSize: 2,
            wrap: true,
          }}
        />
      )}
    </div>
  );
};
export default Dashboard;
