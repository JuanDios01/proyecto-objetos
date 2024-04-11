class Equipo {
    constructor(nombre, precioVenta, precioAlquiler, cantidad) {
        this.nombre = nombre;
        this.precioVenta = precioVenta;
        this.precioAlquiler = precioAlquiler;
        this._cantidad = cantidad;
    }

    get cantidad() {
        return this._cantidad;
    }

    set cantidad(nuevaCantidad) {
        if (nuevaCantidad < 0) {
            throw new Error('La cantidad no puede ser negativa');
        }
        this._cantidad = nuevaCantidad;
    }

    vender(cantidad) {
        if (this._cantidad < cantidad) {
            console.info (`No hay suficientes ${this.nombre} en stock para vender.`);
        }
        this._cantidad -= cantidad;
        return this.precioVenta * cantidad;
    }

    alquilar(cantidad) {
        if (this._cantidad < cantidad) {
            console.info (`No hay suficientes ${this.nombre} en stock para alquilar.`);
        }
        this._cantidad -= cantidad;
        return this.precioAlquiler * cantidad;
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
        }
        let venta = equipo.vender(cantidad);
        if (typeof venta === 'string') {
            return venta;
        }
        this.totalVentas += venta;
        console.info (`Se vendieron ${cantidad} ${nombre}. Total de ventas: ${this.totalVentas}`);
    }

    alquilarEquipo(nombre, cantidad) {
        let equipo = this.equipos.find(equipo => equipo.nombre === nombre);
        if (!equipo) {
            console.info (`El equipo ${nombre} no se encuentra en el almacén.`);
        }
        let alquiler = equipo.alquilar(cantidad);
        if (typeof alquiler === 'string') {
            return alquiler;
        }
        this.totalAlquileres += alquiler;
        console.info (`Se alquilaron ${cantidad} ${nombre}. Total de alquileres: ${this.totalAlquileres}`);
    }
}

let computadora1 = new Equipo("Computadora HP", 1000, 100, 10);
let computadora2 = new Equipo("Computadora Dell", 1200, 120, 8);
let computadora3 = new Equipo("Computadora Lenovo", 900, 90, 12);

let almacen = new Almacen();
almacen.agregarEquipo(computadora1);
almacen.agregarEquipo(computadora2);
almacen.agregarEquipo(computadora3);

console.log("Antes de vender o alquilar:");
almacen.equipos.forEach(equipo => {
    console.log (`Nombre: ${equipo.nombre}, Cantidad: ${equipo.cantidad}`);
});

let venta = almacen.venderEquipo("Computadora HP", 3);
console.log(venta);

let alquiler = almacen.alquilarEquipo("Computadora Dell", 2);
console.log(alquiler);

console.log("Después de vender y alquilar:");
almacen.equipos.forEach(equipo => {
    console.log (`Nombre: ${equipo.nombre}, Cantidad: ${equipo.cantidad}`);
});
