// DialogTrigger.js
import React, { useState, useRef, useEffect } from 'react';
import ArkeDialog from './ArkeDialog';


const DialogTrigger = ({ options }) => {
  console.log(options)
  const [open, setOpen] = useState(options?.open ?? false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      console.log("hello")
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  return (
    <React.Fragment>
      <ArkeDialog
        ref={dialogRef}
        open={open}
        {...options}
        onClose={() => setOpen(false)}
      />
    </React.Fragment>
  );
};

export const openDialog = (options) => {
  return <DialogTrigger options={options} />;
};