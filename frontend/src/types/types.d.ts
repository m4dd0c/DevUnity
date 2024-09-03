type TFilters = "all" | "owned" | "contributions";
type TLang = "js" | "c" | "cpp" | "java" | "py" | "php";

interface ILang {
  id: number;
  label: string;
  value: TLang;
  color: string;
  mode: string;
  defaultCode: string;
}
interface IData<T> {
  data: T;
  message: string;
  success: boolean;
}
interface ISearchUser {
  isNext: boolean;
  users: IUser[];
}
interface IPopulatedRoom {
  _id: string;
  admin: string;
  roomId: string;
  project: {
    title: string;
    lang: string;
    explanation: string;
  };
  createdAt: string;
  updatedAt: string;
}
interface IUser {
  _id: string;
  rooms: IPopulatedRoom[];
  email: string;
  username: string;
  name?: string;
  location?: string;
  portfolio?: string;
  bio?: string;
  verification: { verified: boolean };
  avatar: {
    secure_url?: string | null;
  };
  createdAt: string;
}
interface ISearchRoom {
  isNext: boolean;
  rooms: IRoom[];
}
interface IPopulatedUser {
  _id: string;
  username: string;
  avatar: { secure_url?: string | null };
}
interface IRoom {
  _id: string;
  roomId: string;
  password?: string;
  admin: IPopulatedUser;
  participents: IPopulatedUser[];
  activeUsers: string[]; // activeUsers' ids
  discussion: string;
  project: {
    title: string;
    explanation?: string;
    description?: string;
    lang: TLang;
    code?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ITabButtons {
  describeBtn: null | HTMLButtonElement;
  descriptionBtn: null | HTMLButtonElement;
}

interface IMessage {
  message: string;
  sender: IPopulatedUser;
}
interface IDiscussion {
  _id: string;
  admin: string;
  room: string;
  chat: IMessage[];
  createdAt: string;
  updatedAt: string;
}
interface ICreateSubmission {
  token: string;
}
interface IGetSubmission {
  source_code: string;
  language_id: number;
  stdin: string | null;
  expected_output: string | null;
  stdout: string;
  status_id: number;
  created_at: string;
  finished_at: string;
  time: string;
  memory: number;
  stderr: string | null;
  token: string;
  number_of_runs: number;
  cpu_time_limit: string;
  cpu_extra_time: string;
  wall_time_limit: string;
  memory_limit: number;
  stack_limit: number;
  max_processes_and_or_threads: number;
  enable_per_process_and_thread_time_limit: boolean;
  enable_per_process_and_thread_memory_limit: boolean;
  max_file_size: number;
  compile_output: string | null;
  exit_code: number;
  exit_signal: number | null;
  message: string | null;
  wall_time: string;
  compiler_options: string | null;
  command_line_arguments: string | null;
  redirect_stderr_to_stdout: boolean;
  callback_url: string | null;
  additional_files: string | null;
  enable_network: boolean;
  post_execution_filesystem: string;
  status: {
    id: number;
    description: string;
  };
  language: {
    id: number;
    name: string;
  };
}

interface ISubmitCodeArgs {
  source_code: string;
  language_id: number;
  stdin: string | null;
}
