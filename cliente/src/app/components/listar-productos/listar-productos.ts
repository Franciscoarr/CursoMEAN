import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './listar-productos.html',
  styleUrl: './listar-productos.css',
})
export class ListarProductos implements OnInit {
  listProductos: Producto[] = [];
  constructor(
    private _productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) { }
 
  ngOnInit(): void
  {
    this.obtenerProductos();
  }
 
  obtenerProductos() {
  this._productoService.getProductos().subscribe({
    next: (data) => {
      console.log(data);
      this.listProductos = data;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.log(error);
    }
  });
}
 
eliminarProducto(id: any){
  this._productoService.eliminarProducto(id).subscribe({
    next: (data) => {
      const idStr = String(id);
      this.listProductos = this.listProductos.filter((producto) => String(producto._id) !== idStr);
      this.cdr.detectChanges();
      this.obtenerProductos();
    },
    error: (error) => {
      console.log(error);
    }
  })
}
 
}