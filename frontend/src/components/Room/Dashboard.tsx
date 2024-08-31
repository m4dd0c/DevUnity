// eslint-disable-next-line
import { useCallback, useEffect, useState } from "react";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
// languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-php_laravel_blade";
import "ace-builds/src-noconflict/mode-java";

import { useSocket } from "../../context/useSocket";
import { useParams } from "react-router-dom";
import { ev, getLang } from "../../lib/utils";
import { LabelInputContainer } from "../ui/misc";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

// Set the base path for Ace
ace.config.set(
  "basePath",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/",
);

// eslint-disable-next-line
const Dashboard = ({ room, user }: { room?: IRoom; user: IUser | null }) => {
  const [fullSizeTerminal, setFullSizeTerminal] = useState(false);
  const { changeCode, socket, code, setCode, setLanguage, language } =
    useSocket();
  const { roomId } = useParams();
  const [aceLoaded, setAceLoaded] = useState(false);

  const onChange = (e: any) => {
    if (!roomId) return;
    console.log("onchange");
    setCode(e);
    changeCode({ roomId, code: e });
  };

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
    setCode(room?.project.code || language.defaultCode);
  }, []);

  // settings language
  useEffect(() => {
    if (room) {
      const lang = getLang(room.project.lang);
      if (lang) setLanguage(lang);
    }
  }, [room, setLanguage]);

  // user not found
  useEffect(() => {
    if (!user) return console.log("user not found!");
  }, [user]);
  return (
    <div className="h-screen w-screen flex flex-wrap max-lg:flex-col">
      <div
        className={`h-full ${fullSizeTerminal ? "max-lg:h-0" : "max-lg:h-[70%]"} transition-all w-3/4 max-lg:w-full`}
      >
        {aceLoaded && (
          <AceEditor
            placeholder={language.defaultCode}
            mode={language.mode}
            style={{ height: "100%", width: "100%" }}
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
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              cursorStyle: "smooth",
              highlightActiveLine: true,
              showPrintMargin: false,
              tabSize: 2,
              wrap: true,
            }}
          />
        )}
      </div>
      <div
        className={`${fullSizeTerminal ? "max-lg:h-screen" : "max-lg:h-[30%]"} transition-all bg-black w-1/4 max-lg:w-full text-white px-4 py-2 overflow-y-auto`}
      >
        <div className="flex justify-between items-center px-4 py-2">
          <h1>Output</h1>
          <button
            className="rounded-full p-2 bg-gray-900 lg:hidden"
            onClick={() => setFullSizeTerminal(!fullSizeTerminal)}
          >
            {fullSizeTerminal ? (
              <IconChevronDown size={15} />
            ) : (
              <IconChevronUp size={15} />
            )}
          </button>
        </div>
        <LabelInputContainer className="mb-3">
          <textarea
            id="email"
            autoComplete="off"
            placeholder="enter your input here..."
            className="bg-transparent border max-h-40 max-lg:max-h-20 overflow-y-auto border-gray-900 rounded-lg px-4 py-3"
          />
        </LabelInputContainer>
        <h1 className="py-2">Result</h1>
        <div>
          <p>Hello World!</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
