import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  constructor(private gifService:GifsService) { }

                      //non-null assertion operator '!'
  @ViewChild('txtBuscar') txtBuscar! : ElementRef<HTMLInputElement>;

   buscar(termino : string)
  {
    const valor = this.txtBuscar.nativeElement.value;
    this.gifService.buscarGifs(valor);
    //console.log(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
