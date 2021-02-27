import React, { useRef, useEffect, useState } from "react";

function VisibleToggle(props) {
  const { toggler, children } = props;
  const [open, setOpen] = useState(false);
  const refEle = useRef(null);
  useEffect(() => {
    function detectClick(event) {
        if(refEle.current && !refEle.current.contains(event.target)){
            setOpen(false);
        }
    }

    window.addEventListener("click", detectClick);

    return () => {
      window.removeEventListener("click", detectClick);
    };
  }, []);

  return (
    <div ref={refEle} className="visible-toggle">
      <div onClick={()=>setOpen(!open)} className="visible-toggle__toggler">{toggler}</div>
      {open && <div className="visible-toggle__content">{children}</div>}
    </div>
  );
}

export default VisibleToggle;
