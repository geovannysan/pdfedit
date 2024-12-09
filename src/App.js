import logo from './logo.svg';
import './App.css';
import { degrees, rgb, StandardFonts } from "pdf-lib";
import { PDFDocument } from 'pdf-lib'
import jsPDF from 'jspdf';
import $ from 'jquery';
import { Buffer } from "buffer";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from './Controller/Modal';
function App() {
  let { id } = useParams()
  const [doc, setDoc] = useState("");
  async function modifyPdf() {
    try {
      let imagecedula
      const fileInput = document.getElementById('file');
      const file = fileInput.files[0];
      const type = file.type;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {

        const canvas = document.querySelector("#canvas");
        const url = doc
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        const pages = pdfDoc.getPages()
        const firstPage = pages[2]
        //    const SecondtPage = pages[5]
        const TercerPage = pages[4]

        const { width, height } = firstPage.getSize()
        const newPage = pdfDoc.addPage([width, height]);
        //const { width, height } = SecondtPage.getSize()
        const imageDataUrl = canvas.toDataURL("image/png");
        const imageBytes = await fetch(imageDataUrl).then((res) => res.arrayBuffer());
        //const imageBytesimgen = Buffer.from(reader.result, "base64");
        const image = await pdfDoc.embedPng(imageBytes);
        if (String(file.type).includes("png")) imagecedula = await pdfDoc.embedPng(reader.result)
        if (String(file.type).includes("jpeg")) imagecedula = await pdfDoc.embedJpg(reader.result)
        firstPage.drawImage(image, {
          x: 170,
          y: 495,
          width: width / 3,
          height: height / 25,
        });
        firstPage.drawImage(image, {
          x: 25,
          y: 350,
          width: width / 3,
          height: height / 25,
        });
        /*SecondtPage.drawImage(image, {
          x: 5,
          y: 595,
          width: width / 3,
          height: height / 25,
        });*/
        TercerPage.drawImage(image, {
          x: 323,
          y: 695,
          width: width / 3,
          height: height / 25,
        });
        TercerPage.drawImage(image, {
          x: 15,
          y: 335,
          width: width / 2,
          height: height / 30,
        });
        console.log(type)
        newPage.drawImage(imagecedula, {
          x: 50,
          y: width / 2,
          width: width / 2,
          height: height / 2

        });
        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        let parasm = new FormData();

        let fordata = new FormData();
        const nombres = doc.split("img/")[1];
        parasm.append('archivo', blob, nombres);
        fordata.append('image', blob, nombres);
        try {
          await axios.post("https://api.ticketsecuador.ec/store/api/img/", fordata,
            {
              header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
              }
            })
          // if (statusText == "OK") {
         // await axios.post("https://api.t-ickets.com/mikroti/Comnet/DOCUMENTO", parasm)
          alert("DOCUMENTO FIRMADO\N SOLICITA LA REVISION AL +593980850287")

        } catch (error) {
          window.location.reload()

        }

        //     }

        /*const urls = window.URL.createObjectURL(blob);
        /*const a = document.createElement('a');
        a.href = urls;
        a.download = "" + url.split("https://api.t-ickets.com/mikroti/img/")[1];
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(urls);*/
      }
    }
    catch (err) {
      window.location.reload()
      //console.log("Error al modificar el documento", err)
    }
  }
  $(document).ready(function () {
    if (!fileUploaded) return
    const canvas = document.querySelector("#canvas");
    const btnlimpiar = document.querySelector("#limpiar");
    let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
    const contexto = canvas.getContext("2d");
    const COLOR_PINCEL = "black";
    const COLOR_FONDO = "white";
    const GROSOR = 2;
    let haComenzadoDibujo = false;

    const obtenerXReal = (evento) => {
      if (evento.touches && evento.touches.length > 0) {
        return evento.touches[0].clientX - canvas.getBoundingClientRect().left;
      } else {
        return evento.clientX - canvas.getBoundingClientRect().left;
      }
    };

    const obtenerYReal = (evento) => {
      if (evento.touches && evento.touches.length > 0) {
        return evento.touches[0].clientY - canvas.getBoundingClientRect().top;
      } else {
        return evento.clientY - canvas.getBoundingClientRect().top;
      }
    };

    const inicioDibujo = (evento) => {
      xAnterior = xActual;
      yAnterior = yActual;
      xActual = obtenerXReal(evento);
      yActual = obtenerYReal(evento);
      contexto.beginPath();
      contexto.fillStyle = COLOR_PINCEL;
      contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
      contexto.closePath();
      haComenzadoDibujo = true;
    };

    const movimientoDibujo = (evento) => {
      if (!haComenzadoDibujo) {
        return;
      }

      xAnterior = xActual;
      yAnterior = yActual;
      xActual = obtenerXReal(evento);
      yActual = obtenerYReal(evento);
      contexto.beginPath();
      contexto.moveTo(xAnterior, yAnterior);
      contexto.lineTo(xActual, yActual);
      contexto.strokeStyle = COLOR_PINCEL;
      contexto.lineWidth = GROSOR;
      contexto.stroke();
      contexto.closePath();
      evento.preventDefault();
    };

    const finDibujo = () => {
      haComenzadoDibujo = false;
    };
    canvas.addEventListener("mousedown", inicioDibujo);
    canvas.addEventListener("mousemove", movimientoDibujo);
    canvas.addEventListener("mouseup", finDibujo);
    canvas.addEventListener("mouseout", finDibujo);
    canvas.addEventListener("touchstart", inicioDibujo);
    canvas.addEventListener("touchmove", movimientoDibujo);
    canvas.addEventListener("touchend", finDibujo);
    const limpiar = () => {
      contexto.fillStyle = COLOR_FONDO;
      contexto.fillRect(0, 0, canvas.width, canvas.height);
    };
    btnlimpiar.addEventListener("click", limpiar);
  });
  const [fileUploaded, setFileUploaded] = useState(false);
  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setFileUploaded(true);
    } else {
      setFileUploaded(false);
    }
  };
  async function CargarDocumeto() {
    let nombre = document.getElementById("nombrecontrato")
    if (nombre.value != "") {
      try {
        let parasm = {
          "nombre": nombre.value,
        }
        let { data, statusText } = await axios.post("https://api.t-ickets.com/mikroti/Comnet/DOCUMENTO", parasm)
        if (statusText == 'OK') {
          console.log(data)
          if (data.estado) {
            let resp = await axios.get(data.url)
            setDoc(data.url)
          }
        } else {
          let { statusText } = await axios.get("https://api.ticketsecuador.ec/store/img/" + nombre.value + ".pdf")
          if (statusText != 'OK') {
            setDoc("https://api.ticketsecuador.ec/store/img/" + nombre.value + ".pdf")
            alert("No se encontro el archivo")
          } else {
            setDoc("")
          }
        }
        console.log(data)
      } catch (error) {
        setDoc("")
        alert("No se encontro el archivo")
      }
    }

  }
  async function name() {
    let nombre = id
    console.log(id)

    if (nombre != "") {
      try {
        let parasm = {
          "nombre": nombre,
        }
        let { data, statusText } = await axios.post("https://api.t-ickets.com/mikroti/Comnet/DOCUMENTO", parasm)
        if (statusText == 'OK') {
          //console.log(data)
          if (data.estado) {
            let resp = await axios.get(data.url)
            // console.log(resp)
            setDoc(data.url)
          }
        } else {
          let { statusText } = await axios.get("https://api.ticketsecuador.ec/store/img/" + nombre + ".pdf")
          if (statusText != 'OK') {
            setDoc("https://api.ticketsecuador.ec/store/img/" + nombre + ".pdf")
          } else {
            setDoc("")
          }
        }
        //console.log(data)
      } catch (error) {
        setDoc("")
      }
    }


  }
  useEffect(() => {
    name()
  }, [])
  return (

    <div className='pb-3'>
      <div className=" d-flex  align-items-center justify-content-end bg-speed  " style={{ height: "60px;" }}>
        <li className="nav-item d-block float-end d-flex justify-content-end ">
          <div className="d-flex justify-content-center">
            <div className="col-1"><a className="nav-link" href="https://www.facebook.com/speed.ecuador" target="_blank"><img
              loading="lazy" data-src="" src="imagen/INTERNET-SPEED_ FACEBOOK-02.png" style={{ height: "25px" }} alt="" /></a>
            </div>
            <div className="col-1"><a className="nav-link" href="#" target="_blank"><img data-src=""
              src="imagen/INTERNET-SPEED_TIKTOK-02.png" style={{ height: "25px" }} alt="" loading="lazy" /></a></div>
            <div className="col-1 "><a className="nav-link" href="https://www.instagram.com/speed.ecuador" target="_blank"><img
              loading="lazy" data-src="" src="imagen/INTERNET-SPEED_INSTAGRAM-02.png" style={{ height: "25px" }} alt="" /></a>
            </div>
            <div className="col-1"><a className="nav-link"
              href="https://api.whatsapp.com/send?phone=593980850287&amp;text=Vi%20su%20pagina%20web,%20quiero%20contratar%20sus%20servicios%20para%20mi%20domicilio"
              target="_blank"><img data-src="" src="imagen/INTERNET-SPEED_ WHATSAPP-02.png" loading="lazy"
                style={{ height: "25px" }} alt="" /></a>
            </div>
            <div className="col-1 text-light" style={{ fontSize: "1.0em;" }}>
              <a className="nav-link text-light fw-bold">0980850287</a>
            </div>
          </div>
        </li>
      </div>
      <nav className="navbar navbar-expand-lg  py-1 px-3  shadow-lg" style={{ fontFamily: 'asap-regular' }}>
        <div className="d-flex flex-wrap justify-content-between align-items-center w-100 text-center">
          <a className="navbar-brand   pn-1" href="../" style={{ paddingRight: "-10px;" }}>
            <img data-src="" src="imagen/INTERNET_marca speed a color-02.png" style={{ height: "90px" }} alt="" loading="lazy" />
          </a>
          <div className=" navbar-dark">
            <button className="navbar-toggler float-end" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse  justify-content-center justify-content-sm-end " id="navbarSupportedContent">
            <ul className="navbar-nav fw-bold d-flex flex-wrap align-items-center bg-body ">
              <li className="nav-item  ">
                <a className="nav-link active text-secondary " aria-current="page" href="../">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="../#info">Quiénes somos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary " href="../#planes">Planes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="../contratar.html">Contratar</a>
              </li>
              <li className="nav-item ">
                <a className="nav-link text-secondary" href="../pagos.html">Puntos de pago</a>
              </li>
              <li className="nav-item ">
                <a className="nav-link text-secondary " target="_blank"
                  href="https://api.whatsapp.com/send?phone=593980850287&amp;text=Vi%20su%20pagina%20web,%20quiero%20contratar%20sus%20servicios%20para%20mi%20domicilio">Contáctenos</a>
              </li>


              <li className="nav-item ">
                <a className="nav-link  " href="https://portal.comnet.ec/cliente/login">
                  <img data-src="" src="imagen/INTERNET-speed_ soy cliente 1-02.png" style={{ height: "60px" }} loading="lazy" />
                </a>
              </li>
              <li className="nav-item dropdown d-none">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Planes
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item text-white" href="#planes">Planes</a></li>
                  <li><a className="dropdown-item text-white d-none" href="#">Another action</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li><a className="dropdown-item text-white" href="#">Something else here</a></li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <div className='container  '>
        <div className=' d-flex  align-items-center justify-content-center pt-3'>

          {doc ? <Modal
            url={doc}
          /> : ""}
        </div>
        <h1 className='display-4 mt-5 pt-2 text-center fw-bold'>Firma tu Contrato</h1>
        {doc != "" ? "" : <div className=' container d-flex flex-column text-center justify-content-center'>
          <div className='  container text-center col-12 col-sm-6 '>
            <input className=' form-control text-center' placeholder='Ingresa número de contrato' id='nombrecontrato' />
          </div>
          <div>
            <button className=' btn btn-success mt-2' onClick={CargarDocumeto}> consultar </button>
          </div>
        </div>}
        {doc == "" ? "" :
          <div>
            <div className='d-flex  mt-3 pt-3 mb-1  pb-3 text-center justify-content-center '>
              <label className="custum-file-upload" >
                <div className="icon">
                  {fileUploaded ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" class="bi bi-check-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" fill="green" />
                      <path fill="green" d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                    </svg>
                  ) : (
                    // Si no se cargó un archivo, mostrar el icono de subida
                    <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                      <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" />
                    </svg>
                  )} </div>
                <div className="text">
                  {fileUploaded ? (<span></span>) : (<span>Cargar cédula</span>)}
                </div>
                <input type="file" id="file" accept="image/*" onChange={handleFileUpload} />

              </label>
              <label>

              </label>
            </div>
            {fileUploaded ? <div>
              <div className=' d-flex  text-center justify-content-center mb-2'>
                <canvas id="canvas" ></canvas>
              </div>
              <div className=' d-flex   text-center justify-content-center'>
                <button className='btn btn-primary mx-1 ' onClick={modifyPdf}>FIRMAR</button>
                <button className='btn btn-primary mx-1' id='limpiar'>LIMPIAR</button>
                {doc != "" ? <button className='btn btn-success mx-1 d-none' onClick={() => window.open(doc, '_blank')}>Ver Documento</button> : ""}
              </div>
            </div> : ""}
          </div>}

      </div>
    </div>

  );
}

export default App;
