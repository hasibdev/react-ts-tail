import { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = ({ children, ...rest }: Props) => {
  return (
    <Styled className="px-4 py-2 bg-teal-500 rounded" {...rest}>
      {children}
    </Styled>
  );
};

const Styled = styled.button``;

export default Button;
