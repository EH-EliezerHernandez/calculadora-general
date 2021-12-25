function capturarDato($valorId){
    const dato = document.querySelector($valorId).value;

    return dato;
}

function evento(){
    const $formAnalisisSalarial = document.querySelector("#form-analisis-salarial");
    const btnIdCalcular = "#btn-calcular";
    const contenidoDefaultBtnCalcular = "Calcular Analisis Salarial";
    const arrayListObjSalariados = [];
    const arrayListSalariado = [];

    mostrarElement($formAnalisisSalarial);
    agregarContenidoElemento(contenidoDefaultBtnCalcular,btnIdCalcular);

    $formAnalisisSalarial.addEventListener("click",(evt)=>{
        const targetID = evt.target.id; 

        const objOptionForm = {
            "btn-add": () =>{
                const mensajeError = "Debe Ingresar un salario valido";
                const idCampoNombre = "#campo-name";
                const idCampoSalario = "#campo-salario";
                const nombre = capturarDato("#campo-name");
                const salario = capturarDato("#campo-salario");
                const objAsalariado = {
                    nombre,
                    salario,
                };

                if(validarNumero(salario)){
                    const styleSalario = "bold";
                    const newValorList = `${nombre} <span class="${styleSalario}">USB ${salario}</span>`;
                    añadirList(objAsalariado,arrayListObjSalariados);
                    añadirList(newValorList,arrayListSalariado); 
                    limpiarCampo(idCampoNombre);
                    limpiarCampo(idCampoSalario);
                } else{
                    mostraError(mensajeError,idCampoSalario);
                }
                 
                    
            }
        }
        const functionOption = objOptionForm[targetID];
        functionOption();
    });

}

evento();