import { Button, Collapse } from "@mui/material";
import React, { useState } from "react";

function Dummy({ index }) {
  const [open, setOpened] = useState(false);

  const handleClickEvent = (idx) => {
    setOpened(!open);
  };

  return (
    <>
      <Button onClick={() => handleClickEvent(index)}>Click</Button>
      <Collapse in={open}>
        <div>Hello world {index} </div>
      </Collapse>
    </>
  );
}

export default Dummy;
