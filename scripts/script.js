let nombre = prompt("Por favor, ingresa tu nombre:");
let montoDisponible = parseFloat(prompt("Ingresa la cantidad de dinero a disposición"));
let valorManoDeObra = parseFloat(prompt("Ingresa el precio de la mano de obra por mes"));
let duracionDeLaObra = parseFloat(prompt("Ingresa cuanto tiempo durará tu obra (meses)"));
let valorDeMateriales = parseFloat(prompt("Ingresa el valor de los materiales"));
let cantidadDeCuotas;
let interesTotal = 0;

function calcularInteres() {
    cantidadDeCuotas = parseInt(prompt("¿Cuántas cuotas quieres? (1-6)"));
    if (cantidadDeCuotas < 1 || cantidadDeCuotas > 6 || isNaN(cantidadDeCuotas)) {
        alert("Por favor, ingresa un número válido entre 1 y 6.");
    } else {
        interesTotal = (cantidadDeCuotas - 1) * 5;
        console.log("Porcentaje de interés total para " + cantidadDeCuotas + " cuotas:", interesTotal + "%");
        let tasasDeInteres = [];
        for (let i = 1; i <= cantidadDeCuotas; i++) {
            let tasa = 5 + (i - 1) * 5;
            tasasDeInteres.push(tasa);
        }
        console.log("Tasas de interés para las cuotas seleccionadas:", tasasDeInteres);
    }
}

function calcularCostoFinalConInteres() {
    let costoBase = valorManoDeObra * duracionDeLaObra;
    let montoConInteres = costoBase * (interesTotal / 100);
    let costoFinal = costoBase + montoConInteres;
    console.log("Costo base de la mano de obra:", costoBase);
    console.log("Interés aplicado:", montoConInteres);
    console.log("Costo final de la mano de obra con interés:", costoFinal);
    return costoFinal;
}

calcularInteres();

let costoFinalConInteres = calcularCostoFinalConInteres();
function verificarPresupuesto() {
    let costoTotal = calcularCostoFinalConInteres() + valorDeMateriales;
    if (costoTotal <= montoDisponible) {
        console.log("Felicidades " + nombre + ", puede continuar con la obra, el valor de final de la obra seria de $" + costoTotal);
    } else {
        console.log("Lo lamentamos " + nombre + ", no posee el presupuesto para comenzar la obra.");
    }
}

verificarPresupuesto();

