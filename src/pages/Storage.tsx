import { ChangeEvent, FC, useEffect } from "react";
import styled from "styled-components";
import { useLocalStorage } from "../hooks";

type Props = {};
type UserForm = {
  firstName: string;
  lastName: string;
};

const Storage: FC = (props: Props) => {
  const [value, setValue] = useLocalStorage<UserForm>("userForm", () => {
    return { firstName: "", lastName: "" };
  });

  const setFormField = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue((prevState: UserForm) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log("Before Return");
  return (
    <Styled>
      <h1 className="text-2xl mb-4">Use Local Storage</h1>

      <form>
        <input
          className="w-full block p-2 px-3 border rounded focus:outline-none focus:border-teal-300 transition-colors duration-300"
          value={value.firstName}
          onChange={setFormField}
          name="firstName"
          type="text"
          placeholder="First name"
        />
        <input
          className="mt-3 w-full block p-2 px-3 border rounded focus:outline-none focus:border-teal-300 transition-colors duration-300"
          value={value.lastName}
          onChange={setFormField}
          name="lastName"
          type="text"
          placeholder="Last name"
        />
      </form>
    </Styled>
  );
};

const Styled = styled.div`
  h1 {
  }

  input {
  }
`;

export default Storage;
