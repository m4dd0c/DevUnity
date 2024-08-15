import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

// Set the base path for Ace
ace.config.set(
  "basePath",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/",
);
const Dashboard = ({ room, user }: { room?: IRoom; user: IUser | null }) => {
  const [aceLoaded, setAceLoaded] = useState(false);
  const initialValue = `function () {
  console.log('Collabrite is the best...');
}`;
  const [value, setValue] = useState("");
  const onLoad = (e: any) => {
    console.log("load", e);
    setValue(initialValue);
  };

  const onChange = (e: any) => {
    console.log("changes", e);
  };
  // fix define is not defined
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

  return (
    <div className="h-screen w-screen">
      {aceLoaded && (
        <AceEditor
          placeholder="console.log('collabrite is awesome...');"
          mode="typescript"
          style={{ height: "100vh", width: "100%" }}
          theme="monokai"
          name="playground"
          onLoad={onLoad}
          onChange={onChange}
          fontSize={14}
          lineHeight={19}
          showPrintMargin={true}
          showGutter={true}
          value={value}
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
