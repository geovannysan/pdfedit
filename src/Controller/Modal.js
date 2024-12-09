import { useEffect, useState } from "react"

const Modal = (props) => {
    let { url } = props
    const [height] = useState(0)
    const [width ] = useState(1024)
    const [show, setShow] = useState(false)
    useEffect(() => {
        renderWidth()
    }, [width, height])


    function renderWidth() {
        if (width < 630) {
            return "100%"
        }
        else return "700px";
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => setShow(!show)}>VER CONTRATO <i className=""></i></button>

            {show ? <div
                style={{
                    display: 'none',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '10000'
                }}

            >
                <div style={{
                    height: "100%",
                    width: "100%"
                }}>



                    <div className="container fluid" style={{
                        height: "80%",
                        width: "80%"
                    }}>
                        <div className="card-header ">
                            <div className="d-flex col-6 justify-content-between py-2 align-items-center " >
                                <div>
                                    <h5 className="modal-title text-center justify-content-center"
                                        style={{ fontWeight: "bold" }}
                                    >  <span className="text-danger"
                                        style={{ fontWeight: "bold" }}
                                    ></span> </h5>
                                </div>

                            </div>
                            <div className=" float-end  pb-2">
                                <button type="button" className="btn btn-primary btn-circul" onClick={() => setShow(!show)} >
                                    ×
                                </button>
                            </div>

                        </div>

                        <iframe src={url} width={"100%"} height={renderWidth()} />
                    </div>
                </div>
            </div> : ""}
        </div>
    )
}
export default Modal