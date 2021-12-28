function sumarPorcentajesDescuento(porcentaje1,porcentaje2){
    const porcentajeFinal = porcentaje1 + porcentaje2;
    return porcentajeFinal;
}

function calcularDescuento(porcentajeDescuento,precio){
    const descuento = porcentajeDescuento * precio / 100;
    return descuento;
}

function calcularMontoPagar(descuento,precio){
    const montoPagar = precio - descuento;
    return montoPagar;
}

function calcularResultadosFactura(precio,porcentajeDescuento,cupon){
    const porcentajeDescuentoTotal = sumarPorcentajesDescuento(porcentajeDescuento,cupon);
    const descuento = calcularDescuento(porcentajeDescuentoTotal,precio);
    const monto = calcularMontoPagar(descuento,precio);

    const objectCompra = {
        title: "Informacion del pago",
        descuento,
        monto,
    };
    
    return objectCompra;
}

function validarRangoMonto(monto){
    let isMontoValid = false;
    
    if(monto > 0){
        isMontoValid = true;
        return isMontoValid;
    }
    
    return isMontoValid;
}

function validarMonto(monto){
    let isMontoValid = false;

    if(validarNumero(monto)){
        if(validarRangoMonto(monto)){
            isMontoValid = true;
            return isMontoValid;
        }
    }

    return isMontoValid;
}

function validarCompra(obj){
    const arrayMontos = Object.values(obj);
    const isValidCompra = arrayMontos.every((elementActual)=>
        validarMonto(elementActual)
    );
    
    return isValidCompra;
}
function determinarErrorCompra(obj){
    const {precio,porcentajeDescuento,porcentajeCupon} = obj;
    
    eliminarError();

    if(!validarMonto(precio)){
        const idValorElement = "#precio-producto";
        const mensajeError = "El valor del precio es invalido. Debe ingresar un valor valido";
        mostrarError(mensajeError,idValorElement);
    }

    if(!validarMonto(porcentajeDescuento)){ 
        const idValorElement = "#porcentaje-descuento";
        const mensajeError = "El valor del descuento es invalido. Debe ingresar un valor valido";
        mostrarError(mensajeError,idValorElement);

    }

    if(!validarMonto(porcentajeCupon)){
        const idValorElement = "#cupon-compra";
        const mensajeError = "Debe seleccionar un cupon."; 
        mostrarError(mensajeError,idValorElement);
    }
}

function eventos(){
    const $formularioDescuentos = document.querySelector("#form-descuento");

    mostrarElement($formularioDescuentos);

    $formularioDescuentos.addEventListener("click",evt=>{
        const targetID = evt.target.id;
        
        const arrayIdFormsValors = [
          "btn-calcular",  
        ];

        if(validarValor(targetID,arrayIdFormsValors)){

            const rutaImagen = "../assets/img/price.png";
            const $contenedorResultados = document.querySelector("#section-resultados");
            const valorIDCampoPrecio = "#precio-producto";
            const valorIDCampoDescuento = "#porcentaje-descuento";
            const valorIDCampoCupon = "#cupon";

            const precio = parseFloat(capturarDato(valorIDCampoPrecio));
            const porcentajeDescuento = parseFloat(capturarDato(valorIDCampoDescuento));
            const porcentajeCupon = parseFloat(capturarDato(valorIDCampoCupon));
            const objCompra = {
                precio,
                porcentajeDescuento,
                porcentajeCupon,
            }

            determinarErrorCompra(objCompra);

            if(validarCompra(objCompra)){
                const objResultadoCompra = calcularResultadosFactura(precio,porcentajeDescuento,porcentajeCupon);
                const objResultado = prepararObjResultado(rutaImagen,objResultadoCompra);        
                mostrarElement($contenedorResultados);
                mostrarResultado(objResultado);
            }
        }

    });

    cerrarElemento();
}

eventos();
