import React from "react";

import { TextField } from "@material-ui/core";

export const Title = (props) => {
  const handleChange = (event) => {
    props.setData("title", event.target.value);
  };

  return (
    <form>
      <TextField
        style={{
          margin: 30,
          marginBottom: 0,
          width: "60vw",
        }}
        label="Title"
        variant="outlined"
        size="small"
        onChange={handleChange}
        required
        multiline
        rows={2}
      />
    </form>
  );
};
