import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { UsuarioService } from '../usuario/usuario.service';
import { Perfil } from '../../models/perfil.model';

import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PoliticalProfileService {

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line:variable-name
    public _usuarioService: UsuarioService
  ) { }

  cargarPerfiles( desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/perfiles?desde=' + desde;

    return this.http.get( url );

  }

  obtenerPerfil( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/perfiles/' + id;

    return this.http.get( url )
                .pipe(map( (resp: any) => {
                  return resp.profile;
                } ));

  }

  borrarPerfil( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/perfiles/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                  .pipe(map((resp: any) => {
                    return resp;
                  }),
                  catchError( err => {

                    Swal.fire({
                      type: 'error',
                      title: err.error.mensaje,
                      text: err.error.err.message
                    });

                    return throwError(err);

                  }));

  }

  crearPerfil( perfil: Perfil ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/perfiles/' + '?token=' + this._usuarioService.token;

    return this.http.post( url, perfil )
                .pipe(map((resp: any) => {
                  return resp.profile;
                }),
                catchError( err => {

                  Swal.fire({
                    type: 'error',
                    title: err.error.mensaje,
                    text: err.error.err.message
                  });

                  return throwError(err);

                }));

  }

  buscarPerfil( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/busqueda/coleccion/perfiles/' + termino;

    return this.http.get( url )
                    .pipe(map( (resp: any) => resp.perfiles) );

  }

  actualizarPerfil( perfil: Perfil ) {

    let url = URL_SERVICES + '/perfiles/' + perfil._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, perfil )
                    .pipe(map( (resp: any) => {
                      return resp.profile;
                    }),
                    catchError( err => {

                      Swal.fire({
                        type: 'error',
                        title: err.error.mensaje,
                        text: err.error.err.message
                      });

                      return throwError(err);

                    }));

  }

}
