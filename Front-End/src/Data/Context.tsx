import { createContext, useReducer } from "react";

export const Context = createContext<any>(null);

const ContextProvider = ({ children }: any) => {
  const [states, dispatch] = useReducer(Reducer, initVal);

  return (
    <Context.Provider value={{ ...states, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

const initVal: any = {
  ConvertLoading: false,
  DebugLoading: false,
  QualityLoading: false,
  ConnectingToServer: false,
  reqActive: false,
  isError: false,
  codeInpVal: "",
  outputVal: "",
  searchUserReqMade: false,
  loadingImport: false,
  errorImport: false,
  reposList: [],
  importMessage: "",
  repoLoading: false,
  currentPath: "",
  contentsArr: [],
  toggleToFile: false,
  clickedFileData: "",
  downloadFileLink: "",
  clickedFileName: "",
  currentRepoName: "",
  pathsArr: [],
};

const Reducer = (state = initVal, { type, payload }: any) => {
  switch (type) {
    case CONVERT_LOADING: {
      return {
        ...state,
        reqActive: "convert",
        ConvertLoading: true,
        isError: false,
        outputVal: "",
      };
    }
    case DEBUG_LOADING: {
      return {
        ...state,
        reqActive: "debug",
        DebugLoading: true,
        isError: false,
        outputVal: "",
      };
    }
    case QUALITY_CHECKLOADING: {
      return {
        ...state,
        reqActive: "quality",
        QualityLoading: true,
        isError: false,
        outputVal: "",
      };
    }
    case CONNECTION_LOADING: {
      return {
        ...state,
        reqActive: "ConnectingToServer",
        ConnectingToServer: true,
        isError: false,
        outputVal: "",
      };
    }
    case CONNECTION_SUCCESS: {
      return {
        ...state,
        reqActive: false,
        ConnectingToServer: false,
      };
    }
    case "ISERROR": {
      return {
        ...state,
        reqActive: false,
        ConvertLoading: false,
        DebugLoading: false,
        QualityLoading: false,
        ConnectingToServer: false,
        isError: true,
        outputVal: "",
      };
    }
    case CODEINPCHANGE: {
      return {
        ...state,
        importMessage: "",
        errorImport: false,
        codeInpVal: payload,
      };
    }
    case "SUCCESS": {
      return {
        ...state,
        reqActive: false,
        ConvertLoading: false,
        DebugLoading: false,
        QualityLoading: false,
        ConnectingToServer: false,
        outputVal: payload,
      };
    }

    // Import - OLD
    case SHOW_REPO_TOGGLE: {
      return {
        ...state,
        toggleToFile: false,
        contentsArr: [],
      };
    }

    // Import - New
    case IMPORT_LOADING: {
      return {
        ...state,
        loadingImport: true,
        errorImport: false,
        importMessage: "",
        pathsArr: [],
      };
    }
    case IMPORT_ERROR: {
      return {
        ...state,
        loadingImport: false,
        errorImport: true,
        importMessage: payload || "",
      };
    }
    case SUCCESS_USERNAME: {
      return {
        ...state,
        loadingImport: false,
        errorImport: false,
        reposList: payload,
        contentsArr: [],
        toggleToFile: false,
      };
    }
    case REPO_CLICK_SUCCESS: {
      return {
        ...state,
        loadingImport: false,
        currentRepoName: payload?.currentRepoName,
        contentsArr: payload?.contentsArr,
        reposList: [],
        toggleToFile: false,
      };
    }
    case FOLDER_CLICK_SUCCESS: {
      return {
        ...state,
        loadingImport: false,
        pathsArr: payload?.pathsArr,
        contentsArr: payload?.contentsArr,
        reposList: [],
        toggleToFile: false,
      };
    }
    case FILE_CLICKED_SUCCESS: {
      return {
        ...state,
        loadingImport: false,
        pathsArr: payload?.pathsArr,
        clickedFileData: payload?.clickedFileData,
        downloadFileLink: payload?.downloadFileLink,
        clickedFileName: payload?.clickedFileName,
        reposList: [],
        contentsArr: [],
        toggleToFile: true,
      };
    }
    case REPO_CLICK_ERROR: {
      return {
        ...state,
        loadingImport: false,
        errorImport: false,
        importMessage: "",
      };
    }
    case HIDE_TOGGLE_TO_FILE: {
      return {
        ...state,
        toggleToFile: false,
        errorImport: false,
        importMessage: "",
        reposList: [],
        contentsArr: [],
      };
    }
    case CLEAR_USERNAME_INP: {
      return {
        ...state,
        loadingImport: false,
        errorImport: false,
        importMessage: "",
        reposList: [],
      };
    }

    default: {
      return initVal;
    }
  }
};

// Action Types
export const CODEWIZARD_KEY = "CODEWIZARD_KEY";
export const IMPORT_LOADING = "IMPORT_LOADING";
export const IMPORT_ERROR = "IMPORT_ERROR";
export const SUCCESS_USERNAME = "SUCCESS_USERNAME";
export const CONVERT_LOADING = "CONVERT_LOADING";
export const DEBUG_LOADING = "DEBUG_LOADING";
export const QUALITY_CHECKLOADING = "QUALITY_CHECKLOADING";
export const CONNECTION_LOADING = "CONNECTION_LOADING";
export const CONNECTION_SUCCESS = "CONNECTION_SUCCESS";
export const IS_ERROR = "IS_ERROR";
export const SUCCESS = "SUCCESS";
export const CODE_INP_CHANGE = "CODE_INP_CHANGE";
export const GET_REPO_PATH_LOADING = "GET_REPO_PATH_LOADING";
export const REPO_CLICK_ERROR = "REPO_CLICK_ERROR";
export const REPO_CLICK_SUCCESS = "REPO_CLICK_SUCCESS";
export const FILE_CLICKED_SUCCESS = "FILE_CLICKED_SUCCESS";
export const TOGGLE_TO_FILE = "TOGGLE_TO_FILE";
export const HIDE_TOGGLE_TO_FILE = "HIDE_TOGGLE_TO_FILE";
export const SHOW_REPO_TOGGLE = "SHOW_REPO_TOGGLE";
export const CODEINPCHANGE = "CODEINPCHANGE";
export const FOLDER_CLICK_SUCCESS = "FOLDER_CLICK_SUCCESS";
export const CLEAR_USERNAME_INP = "CLEAR_USERNAME_INP";
