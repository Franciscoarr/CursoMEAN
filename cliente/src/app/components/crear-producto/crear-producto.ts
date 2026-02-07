import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto';
import { UpperCasePipe } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css',
})
export class CrearProducto implements OnInit{
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private _productoService: ProductoService, private aRouter: ActivatedRoute, private toast: ToastrService) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void { 
    this.esEditar();
  }

  agregarProducto() {
    console.log(this.productoForm)

    console.log(this.productoForm.get('producto')?.value);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if(this.id !== null) {
      // Editamos producto

      this._productoService.editarProducto(this.id, PRODUCTO).subscribe({
        next: () => {
          this.toast.success('Producto editado');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error)
        }
      })
    } else {
      // Agregamos producto
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe({
        next: () => {
          this.toast.success('Producto creado');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
          this.productoForm.reset();
        }
      })
    }
  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe({
        next: (data) => {
          this.productoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio
          })
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}
