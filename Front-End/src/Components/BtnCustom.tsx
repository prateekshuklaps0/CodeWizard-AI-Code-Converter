import { css } from "@emotion/react";

import { Button, useTheme } from "@chakra-ui/react";

const BtnCustom = ({ children, onClick }: any) => {
  const theme = useTheme();
  const ContextColors = theme.colors;

  return (
    <Button
      onClick={onClick}
      cursor={"pointer"}
      css={BtnCss(
        ContextColors.primary,
        ContextColors.primary,
        ContextColors.btnHoverBG,
        ContextColors.bgA
      )}
    >
      {children}
      <span className="first"></span>
      <span className="second"></span>
      <span className="third"></span>
      <span className="fourth"></span>
    </Button>
  );
};

export default BtnCustom;

export const BtnCss = (
  color: string,
  borderColor: string,
  hoverBackground: string,
  hoverColor: string
) => css`
  display: inline-flexbox;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 4.2px 8.2px;
  gap: 5px;
  border: none;
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid ${borderColor};
  color: ${color};
  overflow: hidden;
  background: transparent;
  position: relative;
  transition: border-radius 0.75s;

  :hover {
    border-radius: 100px;
    color: ${hoverColor};
    background-color: transparent;

    .chakra-spinner {
      color: ${hoverColor};
    }
  }
  .chakra-spinner {
    color: ${color};
    width: 18px;
    height: 18px;
  }

  span {
    transition: all 0.7s;
    z-index: -1;
  }
  .first {
    content: "";
    position: absolute;
    right: 100%;
    top: 0;
    width: 25%;
    height: 100%;
    background: ${hoverBackground};
  }
  :hover .first {
    top: 0;
    right: 0;
  }
  .second {
    content: "";
    position: absolute;
    left: 25%;
    top: -100%;
    height: 100%;
    width: 25%;
    background: ${hoverBackground};
  }
  :hover .second {
    top: 0;
    left: 50%;
  }
  .third {
    content: "";
    position: absolute;
    left: 50%;
    height: 100%;
    top: 100%;
    width: 25%;
    background: ${hoverBackground};
  }
  :hover .third {
    top: 0;
    left: 25%;
  }
  .fourth {
    content: "";
    position: absolute;
    left: 100%;
    top: 0;
    height: 100%;
    width: 25%;
    background: ${hoverBackground};
  }
  :hover .fourth {
    top: 0;
    left: 0;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    gap: 4.5px;
    font-size: 16.5px;
    border-radius: 5.5px;

    .chakra-spinner {
      width: 16px;
      height: 16px;
    }
  }
  @media (max-width: 480px) {
    padding: 3.8px 7.8px;
    gap: 4px;
    font-size: 16px;
    border-radius: 5px;

    .chakra-spinner {
      width: 15px;
      height: 15px;
    }
  }
`;
