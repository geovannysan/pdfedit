const datos = async(parm)=>{
    try {
        let { data } = await axios.post("https://rec.netbot.ec/mikroti/PortalApi/GetClientsDetailsdos", {
            "cedula": parm,
        })
        return data
    } catch (error) {
        return error
        
    }    
}
async function nuevos(e) {
    e.preventDefault()
    datos(document.getElementById("inputPassword2").value).then(ou => {
        
        if(ou.estado=="exito"){
            //$("#info").removeClass("d-none")
            //document.getElementById("info").classList.remove("d-none");
          //  let valor = ou.facturacion["total_facturas"]
            if (ou.facturacion["facturas_nopagadas"]==0){
                jSuites.notification({
                    //error: 1,
                    name: 'Mensaje importante',
                    message: "No dispone de factura pendiente de pago",
                })
                return
            }
            let detalle = ou.items[0].descrp
            let valor =parseFloat( ou.items[0].precio)
            let total = parseFloat( ou.items[0].total2.replace("$",""))
            let iva = total-valor
            document.getElementById("pvp").innerText = "$" + valor
            document.getElementById("iva").innerText ="$"+iva.toFixed(2)
            document.getElementById("total").innerText="$" +total
            document.getElementById("detalle").innerHTML=detalle
            //document.getElementById("id").classList.remove("d-none");
            //document.querySelector("#info").classList.remove("d-none");
            // VEBTA
            // document.getElementById("id").classList.add("d-none");
            var element = document.getElementById("info");
            element.classList.remove("d-none");
            var element1 = document.getElementById("VEBTA");
            element1.classList.add("d-none");
        }else{
            var element = document.getElementById("info");
            element.classList.add("d-none");
            var element1 = document.getElementById("VEBTA");
            element1.classList.remove("d-none");
            jSuites.notification({
                error: 1,
                name: 'Mensaje importante',
                message: ou.mensaje,
            })
            //window.open('https://contratar.speed.com.ec', '_blank');
        }
        //console.log(ou)
    }).catch(err => {
        console.log(err)
    })
  

}