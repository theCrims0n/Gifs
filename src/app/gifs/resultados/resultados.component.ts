import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  get resultados ()
  {
    return this.gifsService.resultados;
  }

  constructor(private gifsService : GifsService) { }
  @ViewChild('imgRef2') ProfilePic! : ElementRef;

  DownloadProfilePic(url : string) 
  { 
    navigator.clipboard.writeText(url).then().catch(e => console.error(e));
  }
}
