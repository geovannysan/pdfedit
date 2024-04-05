const imagenes = document.querySelectorAll('img')
var idcliente
var facturas
const superpuesto = document.getElementById('superpuesto');
function lazyLoad() {
    for (const imagen of imagenes) {

        if (imagen.getAttribute('data-src')) {
            imagen.src = imagen.getAttribute('data-src')
            console.log(imagen.getAttribute('data-src'))
            imagen.removeAttribute('data-src')
        }
    }
}
window.addEventListener('scroll', lazyLoad)
const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    spaceBetween: 0, // Ajusta este valor para reducir el espacio entre diapositivas

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        800: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 1,
        },
        500: {
            slidesPerView: 1,
        },
        400: {
            slidesPerView: 1,
        },
        300: {
            slidesPerView: 1,
        },
        200: {
            slidesPerView: 1,
        },
        992: {
            slidesPerView: 3,
        },
    },
});
$(document).ready(function () {
    $('.slick-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    spaceBetween: 10,

                }

            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            }
        ],
        nextArrow: '<div class="swiper-button-next" tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-b47a45d67edc65b8"></div>',
        prevArrow: '<div class="swiper-button-prev" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-b47a45d67edc65b8"></div>'
    });
});
let boton = document.getElementById("btn-consulta")
let cedual = document.getElementById("numberce")
let nombr = document.getElementById("nombre")
let direcion = document.getElementById("direccion")
let cantidad = document.getElementById("cantiada")
let valor = document.getElementById("total")
let cerr = document.querySelector(".close")
let calcular = document.querySelector(".calcular")
let calcularcarr = document.querySelector(".calcularcarr")
let cerrar = document.getElementById("close")
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
var modalConsulta = new bootstrap.Modal(document.getElementById('calculosModal'))
var modalcalular = new bootstrap.Modal(document.getElementById('calculosModal'))
var link_pagosme = new bootstrap.Modal(document.getElementById('modallink_pago'))
var cerrarpregunta = document.querySelector(".pregunta")

const imgElement = document.getElementById('imagenplan');
//modalConsulta.show();
document.querySelector('.modal').classList.add('zoom');
cerr.addEventListener("click", function () { myModal.hide(); })
calcular.addEventListener("click", function () {
    console.log("cliekc")
    const imgElement = document.getElementById('planesimagen');
    imgElement.src = '/imagen/PLANES WEB-05.png';
    modalConsulta.hide();
    modalcalular.show();
})
calcularcarr.addEventListener("click", function () {
    imgElement.src = 'imagen/PLANES WEB-05.png';
    modalConsulta.hide();
    modalcalular.show();
})
cerrar.addEventListener("click", function () {
    myModal.hide();
})
cerrarpregunta.addEventListener("click", function () {
    console.log("cloc")
    modalConsulta.hide();
})
function MostarPlan(e, J) {
    modalConsulta.show();
    localStorage.setItem("PLANES", e)
    imgElement.src = "imagen/" + J + ".png";
}
document.querySelector('.btn-close').addEventListener('click', () => {
    modalConsulta.hide()
})
function rediret() {
    //localStorage.setItem("PLANES", "")
    window.location.href = "contratar.html"
}
var cedula, nombre, correo, movil, direccion_principal
boton.addEventListener('click', function (e) {
    console.log(cedual.value)

    if (cedual.value.trim() == "" || cedual.value.trim().length < 5) {
        /* $.alert({
             title: 'Atento!',
             content: 'Ingresa el número de identificación del propietario del servicio!',
         });*/
        return
    }
    Consultas(cedual.value).then(oupt => {
        if (oupt.estado == "exito") {
            let datos = oupt.datos[0]
            idcliente = oupt.datos[0].id
            cedula = datos.cedula
            nombre = datos.nombre
            correo = datos.correo
            movil = datos.movil
            direccion_principal = datos.direccion_principal
            myModal.show();
            document.querySelector('.modal').classList.add('zoom');
            nombr.innerHTML = datos.nombre
            direcion.innerHTML = ""//datos.direccion_principal
            cantidad.innerHTML = "Total de Facturas impagas: " + datos.facturacion.facturas_nopagadas
            valor.textContent = datos.facturacion.total_facturas
            if (parseInt(datos.facturacion.facturas_nopagadas) == 0) {
                document.getElementById("Pagar").classList.add("d-none")
                document.getElementById("cerrar").classList.remove("d-none")
            } else {
                document.getElementById("cerrar").classList.add("d-none")
                document.getElementById("Pagar").classList.remove("d-none")
            }


        }
        console.log(oupt)
    }).catch(err => {
        console.log(err)
    })
    console.log(e)
})
const Consultas = async (parm) => {
    let datos = {
        "cedula": "" + parm,
        "operador": "appspeed"
    }
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/PortalApi/GetClientsDetails", datos)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
/**
 $.confirm({
        title: 'Title',
        content: 'url:text.txt',
        onContentReady: function () {
            var self = this;
            this.setContentPrepend('<div>Prepended text</div>');
            setTimeout(function () {
                self.setContentAppend('<div>Appended text after 2 seconds</div>');
            }, 2000);
        },
        columnClass: 'medium',
    });
 */

document.addEventListener('DOMContentLoaded', function () {


    // Espera 3 segundos y luego desvanece el div
    setTimeout(() => {
        superpuesto.style.opacity = 0;
        setTimeout(() => {
            superpuesto.classList.add("d-none")
        }, 500);
    }, 1000);
});

const ConsultaFactura = async () => {
    let detalle
    try {
        let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/GetInvoices/" + idcliente + "/appspeed")
        if (data.estado == "exito") {
            detalle = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/GetInvoice/" + data.facturas[0].id + "/appspeed")
            if (detalle.data.estado == "exito") {
                data.facturas[0].detalle = detalle.data.items[0].descrp
            } else {
                data.facturas[0].detalle = ""
            }
        } return data
    } catch (error) {
        return error
    }
}

/**
 * 
 * 
 * 
 * 
 */
//https://api.t-ickets.com/mikroti/MovilApi/linkpago
/*
{
        "document": "{{clientecomnet.cedula}}", // cedula 
        "name": "{{clientecomnet.nombre}}", // nombre del cliente 
        "email": "{{clientecomnet.correo}}", //correo del cliente
        "phones": "{{clientecomnet.movil}}", // movil del cliente
        "address": "{{clientecomnet.direccion_principal}}", // direcion del cliente
        "description": "{{descripotio}}", // description de la factura 
        "amount": "{{pagarcomisioan}}", //total a pagar
        "porcentaje": "{{1.08}}", //porcentaje generado
        "idfactura": "{{factura.id}}",//idfactura
        "idecliente": "{{clientecomnet.id}}", // id cliente
        "subtotal": "{{factura.total}}" //total de la factura 
      }
*/

function Generar_link_Pago() {
    $.confirm({
        theme: 'supervan',
        title: 'Confirmar',
        content: 'Al Genara link de pagos se generan recargos por pagos de tarjeta',
        type: 'red',
        buttons: {
            tryAgain: {
                text: 'Generar',
                btnClass: 'btn-red',
                action: function () {
                    superpuesto.style.opacity = 1;
                    superpuesto.classList.remove("d-none")
                    ConsultaFactura().then(ouput => {
                        console.log(ouput)
                        if (ouput.estado == "exito") {
                            facturas = ouput.facturas[0]
                            //
                            let params = {
                                "document": cedula,
                                "name": nombre, // nombre del cliente 
                                "email": correo, //correo del cliente
                                "phones": movil, // movil del cliente
                                "address": direccion_principal, // direcion del cliente
                                "description": facturas.detalle, // description de la factura 
                                "amount": parseFloat(facturas.total) * 1.08, //total a pagar
                                "porcentaje": 1.08, //porcentaje generado
                                "idfactura": facturas.id,//idfactura
                                "idecliente": idcliente, // id cliente
                                "subtotal": facturas.total //total de la factura 
                            }
                            console.log(params)
                            if (Object.values(params).some(e => e == "")) {
                                superpuesto.classList.add("d-none")
                                $.confirm({
                                    title: 'Datos',
                                    content: 'Su perfil no cuenta con todos los datos nesesacios como email o móvil',
                                    autoClose: 'logoutUser|10000',
                                    buttons: {
                                        logoutUser: {
                                            text: 'Cerrar en ',
                                        },
                                        abrirnuevo: {
                                            text: 'Contactar',
                                            action: function () {
                                                window.open("https://api.whatsapp.com/send?phone=593980850287", "_blank")
                                            }
                                        }
                                    }
                                });
                                return
                            }

                            console.log(params)
                            Link_pago(params).then(oputs => {
                                console.log(oputs)
                                if (oputs.success) {
                                    superpuesto.classList.add("d-none")
                                    // $.alert("hubo un error")

                                    link_pagosme.show()
                                    //window.open(oputs.url, "_blank")
                                    var ifr = document.getElementById("linkdepago");
                                    ifr.setAttribute("src", oputs.url);
                                }
                            }).catch(err => {
                                superpuesto.classList.add("d-none")
                                $.alert("hubo un error")
                                console.log(err)
                            })

                        }
                    }).catch(err => {
                        superpuesto.classList.add("d-none")
                        $.alert("hubo un error")
                        console.log(err)
                    })
                }
            },
            
            close:{
                text:"Cancelar"
            }
        }
    });


    const Link_pago = async (parms) => {
        try {
            let { data } = await axios.post("https://api.t-ickets.com/mikroti/MovilApi/linkpago", parms)
            return data
        } catch (error) {
            return error
        }
    }


}