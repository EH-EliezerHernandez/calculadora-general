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

function calcularResultadosCompra(compra){
    const {precio,porcentajeDescuento,cupon} = compra;
    const porcentajeDescuentoTotal = sumarPorcentajesDescuento(porcentajeDescuento,cupon);
    const descuento = calcularDescuento(porcentajeDescuentoTotal,precio);
    const monto = calcularMontoPagar(descuento,precio);
    const objectCompra = {
        imagen: "../assets/img/price.png",
        name: "Informacion del pago",
        descuento,
        monto,
    };
    
    return objectCompra;
}

function capturarDatosCompra(){
    const $campoPrecio = document.querySelector("#precio-producto");
    const $campoPorcentajeDescuento = document.querySelector("#porcentaje-descuento");
    const $campoCupon = document.querySelector("#cupon");
    const $btnCerar = document.querySelector("#btn-cerrar");

    const compra = {
        precio: parseFloat($campoPrecio.value),
        porcentajeDescuento: parseFloat($campoPorcentajeDescuento.value),
        cupon: parseFloat($campoCupon.value),
    };
    
    return compra;
}
function eventos(){
    const $btnCalcular = document.querySelector("#btn-calcular");
    const $btnCerrar = document.querySelector("#btn-cerrar");

    $btnCalcular.addEventListener("click",evt=>{
        const $resultados = document.querySelector("#section-resultados");
        mostrarElement($resultados);
        const compra = capturarDatosCompra();
        const resultado = calcularResultadosCompra(compra);
        console.log(resultado);
        mostrarResultado(resultado);

    });

    $btnCerrar.addEventListener("click",evt => {
        const $resultados = document.querySelector("#section-resultados");
        ocultarElement($resultados);
    })
}

eventos();
