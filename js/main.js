// SIMULADOR PLAZO FIJO
// Clase
class Cliente {
    constructor(dni, nombre, password) {
        this.dni = dni;
        this.nombre = nombre;
        this.password = password;
    }
}

//Funciones
const obtenerIndiceDeClientePorPassword = (password) => {
    let indiceCliente = 0;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].password === password) {
            indiceCliente = i;
            break;
        }
    }
    return indiceCliente;
}

const clienteExiste = (password) => {
    let encontrado = false;
    for (const cliente of clientes) {
        if (cliente.password === password) {
            encontrado = true;
            break;
        }
    }
    return encontrado;
}

const login = () => {
    let password = document.getElementById("passwordCliente").value;
    
    if (!clienteExiste(password)) {
        swal ("Usuario o contraseña incorrectos. " ,  "Intente nuevamente." , "error");
    } else {
        const indiceCliente = obtenerIndiceDeClientePorPassword(password);
        swal ({
            title: "Bienvenido/a " +  clientes[indiceCliente].nombre,
            icon: "success",
            buttons: false,
            timer: 1500
        })

        setTimeout(()=>{
            window.location = "plazo-fijo.html";
        }, 2000)
    }
}

const registerNewUser = () => {
    let newUserDni = document.getElementById("dniNuevoUsuario").value;
    let newUserName = document.getElementById("nombreNuevoUsuario").value;
    let newUserPassword = document.getElementById("passwordNuevoUsuario").value;
    
    dniNewUser = clientes.push(new Cliente((newUserDni),(newUserName),(newUserPassword)));
    
    saveNewUser();
    swal ("Registro exitoso. " ,  "Bienvenido/a " + newUserName, "success");
}

const saveNewUser = () => {
    localStorage.setItem("newUser", JSON.stringify(clientes));
}

const usersLS = () => {
    let clientes = [];
    const clientesLS = localStorage.getItem("newUser");

    if(clientesLS !== null) {
        clientes = JSON.parse(clientesLS);
    }
    return clientes;
}

const calcularPlazoFijo = (porcentaje, anual, mesesDelPlazoFijo) => {
    return (monto) => ((monto * porcentaje) / 100) / anual * mesesDelPlazoFijo;
}




// INICIA PROGRAMA
const clientes = usersLS ();
const plazoFijoUnMes = calcularPlazoFijo(70, 12, 1);
const plazoFijoTresMeses = calcularPlazoFijo(76, 12, 3);
const plazoFijoDoceMeses = calcularPlazoFijo(85, 12, 12);

function invertir () {
    let monto = Number(document.getElementById("capital").value);

    if (document.getElementById("unMes").checked){
        plazoFijoUnMes();
        swal({
            title: "Plazo fijo un mes",
            text: "Por su inversión de $" + monto + " usted recibirá en un mes la suma de $" + (plazoFijoUnMes(monto) + monto).toFixed(2),
            icono: "info",
            buttons: ["Cancelar","Invertir"],
        })
    } 
    else if (document.getElementById("tresMeses").checked){
        plazoFijoTresMeses();
        swal({
            title: "Plazo fijo tres meses",
            text: "Por su inversión de $" + monto + " usted recibirá en tres meses la suma de $" + (plazoFijoTresMeses(monto) + monto).toFixed(2),
            icono: "info",
            buttons: ["Cancelar","Invertir"]
        })
    }
    else if (document.getElementById("doceMeses").checked){
        plazoFijoDoceMeses();
        
        swal({
            title: "Plazo fijo doce meses",
            text: "Por su inversión de $" + monto + " usted recibirá en doce meses la suma de $" + (plazoFijoDoceMeses(monto) + monto).toFixed(2),
            icono: "info",
            buttons: ["Cancelar","Invertir"] 
        })
    }
    else{
        swal("Imposible procesar su solicitud", "Por favor seleccione una opción", "error");
    }
}

// API VALOR DOLAR
fetch ('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
.then( (response) => {
    return response.json();
})
.then( (jsonResponse) =>{
    const contenedor = document.getElementById("contenedor");
    // Dolar oficial
    const nombreDolarOficial = jsonResponse[0].casa.nombre;
    const valorOficialCompra = jsonResponse[0].casa.compra;
    const valorOficialVenta = jsonResponse[0].casa.venta;

    const liNombreDolarOficial = document.createElement("h3");
        liNombreDolarOficial.innerHTML = nombreDolarOficial;
        contenedor.append(liNombreDolarOficial);

    const liCompra = document.createElement("ul");
        liCompra.innerHTML = "Compra $" + valorOficialCompra;
        contenedor.append(liCompra);
        
    const liVenta = document.createElement("ul");
        liVenta.innerHTML = "Venta $" + valorOficialVenta;
        contenedor.append(liVenta);

    // Dolar blue
    const nombreDolarBlue = jsonResponse[1].casa.nombre;
    const valorBlueCompra = jsonResponse[1].casa.compra;
    const valorBlueVenta = jsonResponse[1].casa.venta;

    const liNombreDolarBlue = document.createElement("h3");
        liNombreDolarBlue.innerHTML = nombreDolarBlue;
        contenedor.append(liNombreDolarBlue);

    const liCompraBlue = document.createElement("p");
        liCompraBlue.innerHTML = "Compra $" + valorBlueCompra;
        contenedor.append(liCompraBlue);
        
    const liVentaBlue = document.createElement("p");
        liVentaBlue.innerHTML = "Venta $" + valorBlueVenta;
        contenedor.append(liVentaBlue);
});
