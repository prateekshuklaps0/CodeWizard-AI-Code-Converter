import * as css from "../Styles/NavbarStyles";
import Logo from "../Data/code.webp";
import NoDataImg from "../Data/NoData.svg";
import NoUserFoundImg from "../Data/NoUserFound.svg";
import ImportLogo from "../Data/ImportLogo.svg";

import {
  Box,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  IconButton,
  Progress,
  Button,
  FormControl,
  Avatar,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  GoRepoForked as RepoIconOutline,
  GoFile as FileIconOutline,
} from "react-icons/go";
import {
  FaFolderOpen as FolderIconFilled,
  FaRegFolderOpen as FolderIconOutline,
  FaFile as FileIconFilled,
  FaGithub as GithubIconFilled,
} from "react-icons/fa";
// import { IoIosSearch as SearchIcon } from "react-icons/io";
import { MdClose as CloseIcon } from "react-icons/md";
import { TfiImport } from "react-icons/tfi";
import { LuImport } from "react-icons/lu";
import { CiImport as ImportIcon } from "react-icons/ci";
import { MdSearch as SearchIcon } from "react-icons/md";
import {
  HiUser as UserFilled,
  HiOutlineUser as UserOutline,
} from "react-icons/hi2";
import {
  FileClickReq,
  FolderClickReq,
  GetLsData,
  GetRepoContents,
  SearchGithubUser,
  SetLsData,
} from "../Data/Action";
import {
  CLEAR_USERNAME_INP,
  CODEINPCHANGE,
  Context,
  HIDE_TOGGLE_TO_FILE,
  SHOW_REPO_TOGGLE,
} from "../Data/Context";
import { PiPath as PathIcon } from "react-icons/pi";

const Navbar = ({ isBelow480px }: any) => {
  const {
    dispatch,
    loadingImport,
    errorImport,
    reposList,
    importMessage,
    currentPath,
    contentsArr,
    repoLoading,
    toggleToFile,
    fetchedCodeData,
    downloadFileLink,
    clikedFileName,
    currentRepoName,
    pathsArr,
  } = useContext(Context);
  const chakraToast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const [userNameInp, setInpVal] = useState(GetLsData()?.githubId || "");
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Submit Username Search
  const userNameSubmit = async (e: any) => {
    e.preventDefault();
    if (!loadingImport) {
      SearchGithubUser(dispatch, userNameInp);
    }
  };

  // Repo Path Click handler
  const repoClick = (repoName: string) => {
    if (!loadingImport) {
      GetRepoContents(dispatch, chakraToast, repoName);
    }
  };

  // Folder Click handler
  const folderClickHandler = (folderPath: string) => {
    if (!loadingImport) {
      FolderClickReq(dispatch, chakraToast, currentRepoName, folderPath);
    }
  };

  // File Click handler
  const fileClickHandler = (fileName: string) => {
    if (!loadingImport) {
      FileClickReq(dispatch, currentRepoName, fileName);
    }
  };

  // Download File
  const handleDownloadFile = async () => {
    setDownloadLoading(true);
    const response = await fetch(downloadFileLink);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = clikedFileName;
    link.click();
    setDownloadLoading(false);
  };

  // Clear Function
  const handleClear = () => {
    setInpVal("");
    dispatch({ type: CLEAR_USERNAME_INP });
    const editorTheme = GetLsData()?.editorTheme || "Cobalt";
    SetLsData({ editorTheme });
  };

  useEffect(() => {
    console.log("contentsArr :", contentsArr);
  }, [contentsArr]);

  return (
    <Box css={css.Outer}>
      <Box css={css.TopNavBox}>
        <Box css={css.Title}>
          <Image src={Logo} />
          <Box>
            <Text fontFamily="var(--megrim)">CodeWizard</Text>
            {isBelow480px && <Text css={css.SecondTitle}>AI Code Editor</Text>}
          </Box>
        </Box>
        {!isBelow480px && <Text css={css.SecondTitle}>AI Code Editor</Text>}
        <Button onClick={onOpen} css={css.ImportBtn}>
          <GithubIconFilled />
          <Text>Import</Text>
        </Button>

        <Modal
          isCentered
          isOpen={isOpen}
          onClose={onClose}
          blockScrollOnMount={true}
          initialFocusRef={initialRef}
          size={["xs", "md", "2xl", "3xl"]}
        >
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent css={css.ModalContentCss}>
            <ModalHeader css={css.ModalHeaderCss}>
              {GetLsData()?.userName && (
                <Text className="userNameCss">
                  Hi, <span>{GetLsData()?.userName || ""}</span>
                </Text>
              )}
              <Text className="importCodeHeader">
                <ImportIcon /> Import Code from Github <GithubIconFilled />
              </Text>
              <CloseIcon onClick={onClose} />
            </ModalHeader>

            <ModalBody css={css.ModalBodyCss}>
              <form onSubmit={userNameSubmit}>
                <Box
                  onClick={() =>
                    initialRef.current && initialRef.current.focus()
                  }
                >
                  {(function () {
                    const userAvatar = GetLsData()?.avatar_url || "";
                    return userAvatar ? (
                      <Image src={userAvatar} />
                    ) : (
                      <UserFilled />
                    );
                  })()}
                </Box>
                <input
                  ref={initialRef}
                  value={userNameInp}
                  onChange={(e) => {
                    setInpVal(e.target.value);
                    dispatch({ type: HIDE_TOGGLE_TO_FILE });
                  }}
                  placeholder="Enter Github Username"
                  required
                  type="text"
                  disabled={loadingImport}
                  style={{ cursor: loadingImport ? "not-allowed" : "text" }}
                />
                <Button
                  isDisabled={loadingImport}
                  style={{ cursor: loadingImport ? "wait" : "pointer" }}
                  type="submit"
                >
                  <SearchIcon />
                </Button>
                <Button
                  style={{ cursor: loadingImport ? "wait" : "pointer" }}
                  isDisabled={loadingImport}
                  onClick={handleClear}
                  type="button"
                >
                  <CloseIcon />
                </Button>
              </form>

              {loadingImport && !errorImport && (
                <Box css={css.Loader1OuterDiv}>
                  <Progress
                    colorScheme="var(--bgC)"
                    isIndeterminate
                    className="importCodeProgess"
                  />
                  <Box>
                    <Box css={css.Loader1}></Box>
                  </Box>
                </Box>
              )}

              {!loadingImport && errorImport && (
                <Box css={css.ErrorBoxCss}>
                  {importMessage == "Not Found" ? (
                    <Box>
                      <Image src={NoUserFoundImg} alt={importMessage} />
                      <Text>
                        No user found with username ' <span>{userNameInp}</span>{" "}
                        '
                      </Text>
                    </Box>
                  ) : (
                    <Box>
                      <Image src={NoDataImg} alt={importMessage} />
                      <Text>{importMessage}</Text>
                    </Box>
                  )}
                </Box>
              )}

              {!loadingImport && !errorImport && (
                <Box flexGrow={1} overflow="hidden">
                  {reposList.length == 0 && contentsArr.length == 0 && (
                    <Box css={css.ContentDivOuter}>
                      <Image src={ImportLogo} alt="Import from Github" />
                    </Box>
                  )}

                  {/* Repos */}
                  {reposList.length > 0 && contentsArr.length == 0 && (
                    <Box css={css.RepoListOuterDiv}>
                      <Box className="selectRepoTextDiv">
                        <RepoIconOutline />
                        <Text>Select Repository</Text>
                      </Box>
                      <Box className="containerDiv">
                        {reposList?.map(
                          (repoListItem: any, repoListInd: number) => (
                            <Box
                              key={repoListItem?.id + repoListInd}
                              onClick={(e: any) => {
                                e.stopPropagation();
                                repoClick(repoListItem?.name);
                              }}
                            >
                              <RepoIconOutline />
                              <Text>{repoListItem?.name}</Text>
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>
                  )}

                  {/* Folders */}
                  {reposList.length == 0 && contentsArr.length > 0 && (
                    <Box css={css.RepoListOuterDiv}>
                      <Box className="selectRepoTextDiv">
                        <RepoIconOutline />
                        <Box>
                          <Text
                            onClick={(e: any) => {
                              e.stopPropagation();
                              repoClick(currentRepoName);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {currentRepoName}
                          </Text>
                          {pathsArr?.map((pathItem: any, pathInd: number) => (
                            <>
                              /
                              <Text
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  if (pathItem?.index != pathsArr.length - 1) {
                                    folderClickHandler(pathItem?.path);
                                  }
                                }}
                                style={{
                                  cursor:
                                    pathItem?.index != pathsArr.length - 1
                                      ? "pointer"
                                      : "not-allowed",
                                }}
                                key={pathItem?.name + pathInd}
                              >
                                {pathItem?.name || ""}
                              </Text>
                            </>
                          ))}
                        </Box>
                      </Box>

                      <Box className="containerDiv">
                        {contentsArr?.map(
                          (contentsArrItem: any, contentsArrInd: number) => (
                            <Box
                              onClick={() =>
                                contentsArrItem?.type == "dir"
                                  ? folderClickHandler(contentsArrItem?.path)
                                  : fileClickHandler(contentsArrItem?.path)
                              }
                              key={contentsArrItem?.sha + contentsArrInd}
                            >
                              {contentsArrItem?.type == "dir" ? (
                                <FolderIconOutline />
                              ) : (
                                <FileIconOutline />
                              )}
                              <Text>{contentsArrItem?.name}</Text>
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              )}

              {/* <Box flexGrow={1} overflow="auto">
                <Box>
                  {toggleToFile ? (
                    <Box>
                      <Text>{clikedFileName}</Text>
                      <pre
                        style={{
                          padding: "16px",
                          borderRadius: "4px",
                          backgroundColor: "#313030",
                          color: "white",
                          fontFamily: "monospace",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          overflowX: "auto",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {fetchedCodeData}
                      </pre>
                    </Box>
                  ) : (
                    <Box>
                      {!loadingImport &&
                      !errorImport &&
                      reposList.length == 0 &&
                      importMessage ? (
                        "No Public Repo Exists"
                      ) : (
                        <Box>
                          {repoLoading && (
                            <Progress size="xs" isIndeterminate />
                          )}

                          {!repoLoading && contentsArr.length > 0 ? (
                            <Box>
                              {contentsArr?.map(
                                (
                                  contentsArrItem: any,
                                  contentsArrInd: number
                                ) => (
                                  <Box
                                    onClick={() =>
                                      contentsArrItem?.type == "dir"
                                        ? folderClickHandler(
                                            contentsArrItem?.path
                                          )
                                        : fileClickHandler(
                                            contentsArrItem?.path
                                          )
                                    }
                                    border="1px solid grey"
                                    m="15px"
                                    p="5px 10px"
                                    display="flex"
                                    gap="7px"
                                    key={contentsArrItem?.sha + contentsArrInd}
                                  >
                                    {contentsArrItem?.type == "dir" ? (
                                      <FolderIconOutline />
                                    ) : (
                                      <FileIconOutline />
                                    )}
                                    <Text>{contentsArrItem?.name}</Text>
                                  </Box>
                                )
                              )}
                            </Box>
                          ) : (
                            <Box>
                              {reposList?.map(
                                (repoListItem: any, repoListInd: number) => (
                                  <Box
                                    key={repoListItem?.id + repoListInd}
                                    border="1px solid grey"
                                    m="15px"
                                    p="5px 10px"
                                    display="flex"
                                    gap="7px"
                                    onClick={(e: any) => {
                                      e.stopPropagation();
                                      setCurrRepoName(repoListItem?.name);
                                      repoClick(repoListItem?.name);
                                    }}
                                  >
                                    <RepoIconOutline />
                                    <Text>{repoListItem?.name}</Text>
                                  </Box>
                                )
                              )}
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </Box> */}
            </ModalBody>

            <ModalFooter>
              {toggleToFile && (
                <Box>
                  <button onClick={handleDownloadFile} type="button">
                    {downloadLoading ? "Downloading" : "Download File"}
                  </button>
                  <button
                    onClick={() => {
                      dispatch({
                        type: CODEINPCHANGE,
                        payload: fetchedCodeData,
                      });
                      onClose();
                    }}
                    type="button"
                  >
                    Import Code
                  </button>
                </Box>
              )}
              <button
                onClick={(e: any) => {
                  dispatch({ type: SHOW_REPO_TOGGLE });
                  userNameSubmit(e);
                }}
                type="button"
              >
                Home
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Navbar;
