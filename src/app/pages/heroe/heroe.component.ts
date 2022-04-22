import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: []
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel()

  constructor( private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo') {
      this.heroesService.getHeroe(id)
        .subscribe((resp:any) => {
          this.heroe = resp;
          this.heroe.id = id;
        })
    }
  }

  guardar( form: NgForm ) {
    if(form.invalid) {
      console.log('formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: "Guardando información",
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick:false
    });
    Swal.showLoading();


    if(this.heroe.id) {
      this.heroesService.actualizarHeroe( this.heroe )
      .subscribe( resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: "Se actualizó correctamente",
          icon: 'success'
        })
    })
    } else {
      this.heroesService.crearHeroe( this.heroe )
      .subscribe( resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: "Se creó correctamente",
          icon: 'success'
        })
    })
    }
  }

}
