function capturarDato($valorId){
    const dato = document.querySelector($valorId).value;

    return dato;
}

function evento(){
    const $formAnalisisSalarial = document.querySelector("#form-analisis-salarial");
    const btnIdCalcular = "#btn-calcular";
    const contenidoDefaultBtnCalcular = "Calcular Analisis Salarial";

    mostrarElement($formAnalisisSalarial);
    agregarContenidoElemento(contenidoDefaultBtnCalcular,btnIdCalcular);

    $formAnalisisSalarial.addEventListener("click",(evt)=>{
        const targetID = evt.target.id; 

        const objOptionForm = {
            "btnAdd": () =>{
                const nombre = capturarDato("#campo-name");
                const salario = capturarDato("#campo-salario");

                const objAsalariado = {
                    nombre,
                    salario,
                };
            }
        }

    });

}

evento();