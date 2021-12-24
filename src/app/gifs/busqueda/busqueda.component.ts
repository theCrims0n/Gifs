import { Component, ElementRef,  ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  constructor(private gifService:GifsService) { }
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;

   //non-null assertion operator '!'
  @ViewChild('txtBuscar') txtBuscar! : ElementRef<HTMLInputElement>;

  buscar(termino : string)
  {
      const valor = this.txtBuscar.nativeElement.value;
      this.status3 = !this.status3;       

      if(valor.trim().length > 0)
      {
        this.gifService.buscarGifs(valor);
        this.txtBuscar.nativeElement.value = '';
      }
  }

  buscarInput(termino : string)
  {
      const valor = this.txtBuscar.nativeElement.value;
      this.status1 = !this.status1;       

      if(valor.trim().length > 0)
      {
        this.gifService.buscarGifs(valor);
        this.txtBuscar.nativeElement.value = '';
      }
  }

  borrarTodo()
  {
    this.status2 = !this.status2;       
    this.gifService.borrar();
  }
}
