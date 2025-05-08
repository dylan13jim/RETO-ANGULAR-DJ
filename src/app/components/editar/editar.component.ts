import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  product: Product = {
    id: '',
    nombre: '',
    description: '',
    logo: '',
    fechaLib: new Date(),
    fechaRev: new Date()
  };

  showErrors = false;
  fechaLiberacionValida = true;
  fechaRevisionValida = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getById(id).subscribe({
        next: (producto) => {
          this.product = producto;
        },
        error: () => {
          alert('Producto no encontrado');
          this.router.navigate(['/']);
        }
      });
    }
  }

  enviarFormulario() {
    this.showErrors = true;

    const idValido = this.product.id.length >= 3 && this.product.id.length <= 10;
    const nombreValido = this.product.nombre.length >= 5 && this.product.nombre.length <= 100;
    const descripcionValida = this.product.description.length >= 10 && this.product.description.length <= 200;

    const hoy = new Date();
    const fechaLib = new Date(this.product.fechaLib);
    const fechaRev = new Date(this.product.fechaRev);

    this.fechaLiberacionValida = fechaLib >= new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    this.fechaRevisionValida =
      fechaRev.getFullYear() === fechaLib.getFullYear() + 1 &&
      fechaRev.getMonth() === fechaLib.getMonth() &&
      fechaRev.getDate() === fechaLib.getDate();

    if (
      !idValido ||
      !nombreValido ||
      !descripcionValida ||
      !this.product.logo ||
      !this.fechaLiberacionValida ||
      !this.fechaRevisionValida
    ) {
      return;
    }

    // Actualizar producto
    this.apiService.update(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  volver() {
    this.router.navigate(['/']);
  }
}
