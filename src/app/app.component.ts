import { Component } from '@angular/core';
import { Articulo } from './articulo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CARRITO DE COMPRAS';
  articulos: Articulo[] = [];
  nombreInput: string = '';
  cantidadInput: number = 0;
  precioInput: number = 0;
  precioTotal: number = 0;

  agregarArticulo() {
    const articuloExist = this.existeArticulo(this.nombreInput);

    if (this.cantidadInput < 1 || this.precioInput < 1) {
      alert('Ingrese un valor correcto');
      return true;
    }

    if (articuloExist) {
      const i = this.articulos.findIndex(
        (articulo) => articulo.nombre === this.nombreInput
      );
      this.articulos[i].cantidad += Number(this.cantidadInput);
    } else {
      let articuloForm = new Articulo(
        this.nombreInput,
        Number(this.cantidadInput),
        Number(this.precioInput)
      );
      this.articulos = [...this.articulos, articuloForm];
    }

    this.calcularPrecioTotal();
    return true;
  }

  calcularPrecioTotal() {
    this.precioTotal = 0;
    this.articulos.forEach((articulo) => {
      this.precioTotal += articulo.precio * articulo.cantidad;
    });
  }

  existeArticulo(nombreArticulo: string) {
    const exist = this.articulos.some(
      (articulo) => articulo.nombre === nombreArticulo
    );
    return exist;
  }
}
