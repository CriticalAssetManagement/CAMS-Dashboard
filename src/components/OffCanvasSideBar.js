
import React, {useState} from "react"
import {Offcanvas} from "react-bootstrap"
import SlidingPanel from 'react-sliding-side-panel';

export const OffCanvasSideBar = ({show, handleClose}) => {
    const [openPanel, setOpenPanel] = useState(false);

    return <>
    <div>
      <div>
        <button onClick={() => setOpenPanel(true)}>Open</button>
      </div>
      <SlidingPanel
        type={'right'}
        isOpen={true}
        size={10}
      >
        <div>
          <div>My Panel Content</div>
          <button onClick={() => setOpenPanel(false)}>close</button>
        </div>
      </SlidingPanel>
    </div>
    </>

    return <React.Fragment>
        <Offcanvas show={show} onHide={handleClose} backdrop={false} placement={"bottom"} style={{height: "fit-content"}}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
    </React.Fragment>
}