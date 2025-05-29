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
  logoValido = true;

  listaIdsExistentes: string[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    
    this.apiService.getAll().subscribe((productos: Product[]) => {
      this.listaIdsExistentes = productos.map(p => p.id);
    });
  }
  
  onFechaLiberacionChange(event: any) {
    const fechaString = event.target.value;
    
    if (fechaString && fechaString.length === 10) {
      const fechaLib = new Date(fechaString);           
      if (!isNaN(fechaLib.getTime())) {        
        const fechaRev = new Date(fechaLib);
        fechaRev.setFullYear(fechaLib.getFullYear() + 1);            
        this.product.fechaRev = fechaRev;       
        this.fechaRevisionValida = true;
      }
    }
  }

  
  get fechaRevisionFormateada(): string {
    if (!this.product.fechaRev) return '';
    
    const d = new Date(this.product.fechaRev);
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  validarId(id: string): boolean{
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(id);
  }

  validarNombre(nombre: string): boolean {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(nombre);
  }
  
  validarFormatoURL(url: string): boolean {
    const regex = /\.(jpeg|jpg|png|svg|webp)$/i;
    try {
      const parsedUrl = new URL(url);
      return regex.test(parsedUrl.pathname);
    } catch (_) {
      return false;
    }
  }

  validarImagenURL(url: string): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  validarDescripcion(description: string): boolean{
    const regex = /^[A-Za-z0-9\s]+$/;
    return regex.test(description);
  }

  async enviarFormulario() {
  this.showErrors = true;

  const idValido = this.product.id.length >= 3 && this.product.id.length <= 10 && this.validarId(this.product.id);
  const nombreValido = this.product.nombre.length >= 5 && this.product.nombre.length <= 100 && this.validarNombre(this.product.nombre);
  const descripcionValida = this.product.description.length >= 10 && this.product.description.length <= 200;
  const urlFormatoValido = this.validarFormatoURL(this.product.logo);
 

  const hoy = new Date();
  const fechaLib = new Date(this.product.fechaLib);

  this.fechaLiberacionValida = fechaLib >= new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());    
  this.fechaRevisionValida = true;
  this.idDuplicado = this.listaIdsExistentes.includes(this.product.id);

  this.logoValido = urlFormatoValido && await this.validarImagenURL(this.product.logo);

  if (
    !idValido ||
    this.idDuplicado ||
    !nombreValido ||
    !descripcionValida ||
    !this.logoValido ||
    !this.fechaLiberacionValida
  ) {
    return;
  }

  this.apiService.create(this.product).subscribe(() => {
    this.router.navigate(['/']);
  });       
}
  
  volver() {
    this.router.navigate(['/']); 
  }
}