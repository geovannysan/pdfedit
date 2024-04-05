let phone = document.getElementById("phone");
let televi = document.getElementById("televi");
let computer = document.getElementById("computer");
let verficaplan = document.getElementById("calcular")
const imgElement = document.getElementById('planesimagen');
verficaplan.addEventListener("click", function () {
    console.log("clieck")
    var tv = 25 * parseInt(televi.value==""?0:televi.value)
    var ph = 8 * parseInt(phone.value==""?0:phone.value)
    var pc = 15 * parseInt(computer.value==""?0:computer.value)
    const enpr = (tv + pc + ph);
    if (enpr < 100) {
        console.log("recomendar Home")
        
        imgElement.src = '/imagen/PLANESWEB-05.png';
        //window.location.href = '/contratar.html';
        return
    }
    if (enpr > 100 && enpr < 130) {
        console.log("recomendar Silver")
        imgElement.src = '/imagen/PLANESWEB-04.png';
       // window.location.href = '/contratar.html';
        return
    }
    if (enpr > 130 && enpr < 170) {
        console.log("recomendar Advance")
        imgElement.src = '/imagen/PLANESWEB-03.png';
       // window.location.href = '/contratar.html';
        return
    }
    if (enpr > 170 && enpr < 220) {
        console.log("recomendar pro")
        imgElement.src = '/imagen/PLANESWEB-02.png';
        //window.location.href = '/contratar.html';
        return
    }
    if (enpr > 220 ) {
        console.log("recomendar Speed")
        imgElement.src = '/imagen/PLANESWEB_Mesadetrabajo1.png';
        //window.location.href = '/contratar.html';

        return
    }




})
