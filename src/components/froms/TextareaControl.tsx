import React from "react";
import styled from "styled-components";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextareaControl = (props: Props) => {
  return (
    <textarea
      className="w-full block p-2 px-3 border rounded focus:outline-none focus:border-teal-300 transition-colors duration-300"
      onChange={props.onChange}
      value={props.value}
    ></textarea>
  );
};

export default TextareaControl;
