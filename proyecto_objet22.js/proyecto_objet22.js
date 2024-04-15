class Equipo {
    constructor(nombre, cantidad) {
        this._nombre = nombre;
        this._cantidad = cantidad;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    get cantidad() {
        return this._cantidad;
    }

    set cantidad(nuevaCantidad) {
        if (nuevaCantidad < 0) {
            console.info('La cantidad no puede ser negativa');
            return;
        }
        this._cantidad = nuevaCantidad;
    }

    vender(cantidad) {
        if (this._cantidad < cantidad) {
            return "No hay suficientes equipos en stock para vender.";
        }
        this._cantidad -= cantidad;
        return "Venta exitosa.";
    }

    alquilar(cantidad) {
        if (this._cantidad < cantidad) {
            return "No hay suficientes equipos en stock para alquilar.";
        }
        this._cantidad -= cantidad;
        return "Alquiler exitoso.";
    }
}

class Almacen {
    constructor() {
        this.equipos = [];
        this.totalVentas = 0;
        this.totalAlquileres = 0;
    }

    agregarEquipo(equipo) {
        this.equipos.push(equipo);
    }

    venderEquipo(nombre, cantidad) {
        let equipo = this.equipos.find(equipo => equipo.nombre === nombre);
        if (!equipo) {
            console.info (`El equipo ${nombre} no se encuentra en el almacén.`);
            return;
        }
        let mensajeVenta = equipo.vender(cantidad);
        console.log(mensajeVenta);
        if (mensajeVenta === "Venta exitosa.") {
            this.totalVentas += cantidad;
        }
    }

    alquilarEquipo(nombre, cantidad) {
        let equipo = this.equipos.find(equipo => equipo.nombre === nombre);
        if (!equipo) {
            console.info (`El equipo ${nombre} no se encuentra en el almacén.`);
            return;
        }
        let mensajeAlquiler = equipo.alquilar(cantidad);
        console.log(mensajeAlquiler);
        if (mensajeAlquiler === "Alquiler exitoso.") {
            this.totalAlquileres += cantidad;
        }
    }

    mostrarIngresos() {
        console.log(`Total de ventas: ${this.totalVentas}`);
        console.log(`Total de alquileres: ${this.totalAlquileres}`);
    }
}

let computadora1 = new Equipo("Computadora HP", 10);
let computadora2 = new Equipo("Computadora Dell", 8);

let almacen = new Almacen();
almacen.agregarEquipo(computadora1);
almacen.agregarEquipo(computadora2);

almacen.venderEquipo("Computadora HP", 3);
almacen.alquilarEquipo("Computadora Dell", 2);

almacen.mostrarIngresos();
