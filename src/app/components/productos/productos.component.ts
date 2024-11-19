import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/productos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  query: string = '';  
  productos: any[] = [];  
  traduccion: string = '';  
  loading: boolean = false;  

  constructor(private productoService: ProductoService, private snackBar: MatSnackBar) {}

  buscarProductos() {
    this.loading = true;
  
    this.productoService.obtenerTraduccion(this.query).subscribe({
      next: (traduccionResponse) => {
        const traduccion = traduccionResponse.message;
  
        this.productoService.obtenerProductos(this.query, traduccion).subscribe({
          next: (productosResponse) => {
            if (productosResponse?.Response?.length > 0) {
              const productosBackend = productosResponse.Response[0].Articulos;
  
              this.productos = productosBackend.map((item: any) => ({
                name: item.Descripcion,
                image: item.Foto,
                price: item.Precio,
              }));
            } else {
              this.productos = [];
              this.snackBar.open(
                'No se encontraron productos.',
                'Cerrar',                       
                { duration: 5000 }
              );
            }
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al obtener productos:', err);
            this.snackBar.open(
              'Ocurrió un error al obtener los productos.',
              'Cerrar',
              { duration: 5000 }
            );
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error('Error al obtener traducción:', err);
        this.snackBar.open(
          'Ocurrió un error al obtener la traducción.',
          'Cerrar',
          { duration: 5000 }
        );
        this.loading = false;
      },
    });
  }
}
