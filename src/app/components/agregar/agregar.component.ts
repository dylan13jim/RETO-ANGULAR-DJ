import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent implements OnInit {
  product: Product = {
    id: '',
    nombre: '',
    description: '',
    logo: '',
    fechaLib: new Date(),
    fechaRev: new Date()
  };

  showErrors = false;
  idDuplicado = false;
  fechaLiberacionValida = true;
  fechaRevisionValida = true;

  listaIdsExistentes: string[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    // Obtener IDs existentes desde el backend
    this.apiService.getAll().subscribe((productos: Product[]) => {
      this.listaIdsExistentes = productos.map(p => p.id);
    });
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

    this.idDuplicado = this.listaIdsExistentes.includes(this.product.id);

    if (
      !idValido ||
      this.idDuplicado ||
      !nombreValido ||
      !descripcionValida ||
      !this.product.logo ||
      !this.fechaLiberacionValida ||
      !this.fechaRevisionValida
    ) {
      return;
    }

    // Si pasa validación, guardar producto
    this.apiService.create(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });       
  }

  //para regresar
  volver() {
    this.router.navigate(['/']); 
  }
}
