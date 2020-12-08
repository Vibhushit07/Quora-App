import React, { useState } from "react";

import { TextField } from "@material-ui/core";

export const Content = (props) => {
  const [label, setLabel] = useState("Description of Title");

  const handleClick = () => {
    setLabel("Question");
  };

  const handleBlur = () => {
    setLabel("Description of Title");
  };

  const handleChange = (event) => {
    props.setData("content", event.target.value);
  };

  return (
    <form>
      <TextField
        label={label}
        variant="outlined"
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        required
        multiline
        rows={10}
        fullWidth
        style={{
          margin: 30,
          width: "60vw",
        }}
      />
    </form>
  );
};
