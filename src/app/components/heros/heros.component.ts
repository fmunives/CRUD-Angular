import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../../services/firebase.service";
import { HeroModel } from "../../models/hero.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-heros",
  templateUrl: "./heros.component.html",
  styleUrls: ["./heros.component.css"]
})
export class HerosComponent implements OnInit {
  heros: HeroModel[] = [];
  loading: boolean;

  constructor(private firebase: FirebaseService) {
    this.loading = true;
  }

  ngOnInit() {
    this.firebase.getAllHeros().subscribe(
      resp => {
        this.heros = resp;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  deleteHero(hero: HeroModel, i: number) {
    Swal.fire({
      title: "Sure?",
      text: `Do you want to delete to ${hero.name}`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heros.splice(i, 1);
        this.firebase.deleteHero(hero.id).subscribe();
      }
    });
  }
}
