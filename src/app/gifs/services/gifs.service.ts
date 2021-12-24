import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //Asignamos los valores para los parametros de la consulta de la API
  private apiKey : string = 'EFCzxTV07LSZovuPf6ZOkKwTd6RvZCFR';
  private _historial : string[] = [];
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  public resultados : Gif [] = [];

  get historial()
  {
    return [...this._historial];
  }

  constructor(private http : HttpClient) 
  { 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  
  public buscarGifs(query : string = '')
  {
    //debugger;
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query))
    {
      this._historial.unshift(query);
      this._historial  = this._historial.splice(0,10);

      //Guardamos en nuestra cache las consultas anteriores para mantenerlos en el refresh
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //Parametros para consulta de api HTTP
    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '10').set('q', query);

    //Enviamos los parametros de la URL y obtenemos los datos de la API (GET)
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
     .subscribe( (resp) => {
      this.resultados = resp.data;

      //Guardamos en nuestra cache las consultas anteriores para mantenerlos en el refresh
      localStorage.setItem('resultados', JSON.stringify(this.resultados));

    });

  }
  //Borramos nuestra cache y los datos del ngFor
  public borrar ()
  {
    this._historial =  [];
    this.resultados  = [];
  }
}
