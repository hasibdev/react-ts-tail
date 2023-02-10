import { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "./DefaultHeader";

type Props = {};

const DefaultLayout: FC = (props: Props) => {
  return (
    <Styled>
      {/* Header */}
      <DefaultHeader />

      {/* Main Content */}
      <div className="container mx-auto">
        <Outlet />
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  .container {
  }
`;

export default DefaultLayout;
