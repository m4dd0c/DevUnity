// eslint-disable-next-line
import { useCallback, useEffect, useState } from "react";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";

import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/ext-language_tools";
// languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-php_laravel_blade";
import "ace-builds/src-noconflict/mode-java";

import { useSocket } from "../../context/useSocket";
import { useParams } from "react-router-dom";
import { ev, getElapsedTime, getLang } from "../../lib/utils";
import { LabelInputContainer } from "../ui/misc";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Loader from "../layout/Loadings/Loader";

// Set the base path for Ace
ace.config.set(
  "basePath",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/",
);

// eslint-disable-next-line
const Dashboard = ({ room }: { room?: IRoom }) => {
  const [fullSizeTerminal, setFullSizeTerminal] = useState(false);
  const {
    changeCode,
    socket,
    code,
    setCode,
    setLanguage,
    language,
    submittingCode,
    codeOutput,
    setStdin,
  } = useSocket();
  const { roomId } = useParams();
  const [aceLoaded, setAceLoaded] = useState(false);

  const onChange = (e: any) => {
    if (!roomId) return;
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
      setCode(code);
    },
    [setCode],
  );

  // requesting code
  const codeReq = useCallback(
    ({ socketId }: { socketId: string }) => {
      if (!socket) {
        console.log({ info: "Socket not yet loaded!" });
        return;
      }
      socket.emit(ev["f:code_load"], { socketId, code });
    },
    [code, socket],
  );

  // on code change recieve
  useEffect(() => {
    // events handling
    if (!socket) {
      console.log({ info: "Socket not yet loaded!" });
      return;
    }

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
    if (!socket) {
      console.log({ info: "Socket not yet loaded!" });
      return;
    }
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

  return (
    <div className="flex h-screen w-screen flex-wrap max-lg:flex-col">
      <div
        className={`h-full ${fullSizeTerminal ? "w-0 max-lg:h-0" : "w-3/4 max-lg:h-[70%]"} transition-all max-lg:w-full`}
      >
        {aceLoaded && (
          <AceEditor
            placeholder={language.defaultCode}
            mode={language.mode}
            style={{ height: "100%", width: "100%" }}
            theme="github_dark"
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
        className={`${fullSizeTerminal ? "w-full max-lg:h-screen" : "w-1/4 max-lg:h-[30%]"} overflow-y-auto bg-black px-4 py-2 text-white transition-all max-lg:w-full`}
      >
        <div className="flex items-center justify-between px-4 py-2 lg:flex-row-reverse">
          <h1>Output</h1>
          <button
            className="rounded-full bg-gray-900 p-2"
            onClick={() => setFullSizeTerminal(!fullSizeTerminal)}
          >
            {fullSizeTerminal ? (
              <IconChevronDown size={15} className="lg:-rotate-90" />
            ) : (
              <IconChevronUp size={15} className="lg:-rotate-90" />
            )}
          </button>
        </div>
        <LabelInputContainer className="mb-3">
          <textarea
            onChange={(e) => setStdin(e.target.value)}
            autoComplete="off"
            placeholder="enter your input (new line separated if more than one)"
            className="max-h-40 min-h-14 overflow-y-auto rounded-lg border border-gray-900 bg-transparent px-4 py-3 max-lg:max-h-20"
          />
        </LabelInputContainer>
        <div className="flex items-center justify-between px-4">
          <h1 className="py-2">Result</h1>
          {codeOutput && (
            <p className="text-sm opacity-50">
              ElapsedTime:{" "}
              {getElapsedTime({
                createdAt: codeOutput?.created_at,
                finishedAt: codeOutput?.finished_at,
              })}
              ms
            </p>
          )}
        </div>
        {/* if codeoutput aint null */}
        {codeOutput && (
          <div>
            {/* if loading then show loader */}
            {submittingCode ? (
              <div className="mx-auto w-fit">
                <Loader />
              </div>
            ) : // if not loading then checking if accepted or failed
            codeOutput.status.description === "Accepted" ? (
              // if accepted
              <div id="terminal">
                <h1 className="text-green-500">Success</h1>
                <pre>{atob(codeOutput.stdout || "")}</pre>
              </div>
            ) : (
              //  if failed
              <div id="terminal">
                <h1 className="text-red-500">
                  {codeOutput.status.description}
                </h1>
                <pre>
                  {atob(codeOutput.stderr || codeOutput.compile_output || "")}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
