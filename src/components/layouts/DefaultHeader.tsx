import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import tw from "twin.macro";

type Props = {};

const DefaultHeader: FC = (props: Props) => {
  return (
    <Styled className="py-4 shadow">
      <div className="container  mx-auto">
        <ul className="flex">
          <li>
            <NavLink
              className="p-3 hover:text-teal-500 transition-colors duration-200"
              to="/"
            >
              {" "}
              Home{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              className="p-3 hover:text-teal-500 transition-colors duration-200"
              to="/storage"
            >
              Local Storage{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              className="p-3 hover:text-teal-500 transition-colors duration-200"
              to="/intersection"
            >
              {" "}
              InterSection{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              className="p-3 hover:text-teal-500 transition-colors duration-200"
              to="/tik-tak"
            >
              {" "}
              Tik Tak{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              className="p-3 hover:text-teal-500 transition-colors duration-200"
              to="/place"
            >
              {" "}
              Place{" "}
            </NavLink>
          </li>
          {/* <li > <NavLink to='/todos'> Todos </NavLink> </li> */}
        </ul>
      </div>
    </Styled>
  );
};

const Styled = styled.header`
  .container {
  }
  ul {
    li {
      a {
        font-size: 18px;
        &.active {
          color: teal;
        }
      }
      &:first-child {
        a {
          padding-left: 0px;
        }
      }
    }
  }
`;

export default DefaultHeader;
