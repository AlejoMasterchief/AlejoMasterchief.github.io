const ingresos = [
    new Ingresos('Plan Fibra Hogar 100Mbps', 25.50),
    new Ingresos('Plan Corporativo Simétrico', 150.00),
    new Ingresos('Costo de Instalación Nuevo Cliente', 45.00),
    new Ingresos('Venta Router Dual Band WiFi 6', 65.00),
    new Ingresos('Alquiler de IP Fija Mensual', 15.00),
    new Ingresos('Reconexión de Servicio Suspendido', 10.00),
    new Ingresos('Venta Extensor de Rango Mesh', 55.00),
    new Ingresos('Recargos por Pago Tardío', 5.50),
    new Ingresos('Alquiler Espacio en Torre (Co-ubicación)', 250.00),
    new Ingresos('Suscripción Pack TV/IPTV', 112.00),
    new Ingresos('Servicio de Soporte Técnico Premium', 20.00),
    new Ingresos('Venta de Kit Herramientas a Terceros', 185.00),
    new Ingresos('Publicidad en Portal WiFi Gratuito', 100.00),
    new Ingresos('Configuración VPN Corporativa', 400.00),
    new Ingresos('Venta de Cableado Estructurado Interior', 35.00)
];

const egresos = [
    new Egresos('Pago Tránsito IP (Ancho de Banda)', 600.00),
    new Egresos('Alquiler de Postación Eléctrica', 180.00),
    new Egresos('Sueldos Técnicos de Campo', 400.00),
    new Egresos('Seguros contra Robo e Incendio', 85.00),
    new Egresos('Consumo Eléctrico Nodo Central', 110.00)
];


let totalIngresos = () => {
    let i = 0;
    for(let ingreso of ingresos){
        i += ingreso.valor;
    }
    return i;
}

let totalEgresos = () => {
    let i = 0;
    for(let egreso of egresos){
        i += egreso.valor;
    }
    return i;
}

let balance = () => {
    return totalIngresos() - totalEgresos();
}

const darFormatoMoneda = (valor) => {
    return valor.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
}

const darFormatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:2})
}


let cargarCabecero = () => {
    balance();
    document.getElementById('porcentaje').innerHTML = darFormatoPorcentaje(totalEgresos()/ totalIngresos());
    document.getElementById('ingresos').innerHTML = darFormatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = darFormatoMoneda(totalEgresos());
    document.getElementById('balance').innerHTML = darFormatoMoneda(balance());
    cargarTablaIngresos();
    cargarTablaEgresos();
}

const cargarTablaIngresos = () => {
    let varIngresos = '';
    for(let ingreso of ingresos){
        varIngresos += cargarIngresosHTML(ingreso);
    }
    document.getElementById('contenedor-des-va').innerHTML = varIngresos;
}
        
let cargarIngresosHTML = (ingreso) => {
    let ingresosHTML = `
        <div class="valores">
            <div class="descripcion">
                ${ingreso.descripcion}
            </div>
            <div class="valor">
                + ${darFormatoMoneda(ingreso.valor)}
            </div>
            <i class="bi bi-x-circle cerrar" onclick= "eliminarIngreso(${ingreso.id})"></i>
         </div>
    `;
    return ingresosHTML;
}

const cargarTablaEgresos = () => {
    let varEgresos = '';
    for(let egreso of egresos){
        varEgresos += cargarEgresosHTML(egreso);
    }
    document.getElementById('contenedor-egresos').innerHTML = varEgresos;
}
        
let cargarEgresosHTML = (egreso) => {
    let egresosHTML = `
        <div class="valores">
            <div class="descripcion">
                ${egreso.descripcion}
            </div>
            <div class="valor">
                - ${darFormatoMoneda(egreso.valor)}
            </div>
            <i class="bi bi-x-circle cerrar" onclick= "eliminarEgreso(${egreso.id})"></i>
         </div>
    `;
    return egresosHTML;
}

const eliminarIngreso = (id) => {
    let eliminarId = ingresos.findIndex(ingreso => ingreso.id === id)
    ingresos.splice(eliminarId, 1);
    cargarCabecero();
    cargarTablaIngresos();
}

const eliminarEgreso = (id) => {
    let eliminarId = egresos.findIndex(egreso => egreso.id === id)
    egresos.splice(eliminarId, 1);
    cargarCabecero();
    cargarTablaEgresos();
}

const cargarDescripcion = () => {
    let formulario = document.forms['forma'];
    let tipo = formulario['tipo']
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];
    
    if(descripcion.value !=='' && valor.value !==''){
        if(tipo.value == 'ingreso'){
            ingresos.push( new Ingresos(descripcion.value, +valor.value));
        }

        if(tipo.value == 'egreso'){
            egresos.push( new Egresos(descripcion.value, +valor.value));
        }
    }

    descripcion.value = ''; 
    valor.value= ''; 

    cargarCabecero();
    cargarTablaEgresos();
    cargarTablaIngresos();
}