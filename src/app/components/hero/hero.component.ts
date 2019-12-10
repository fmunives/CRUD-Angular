import { Component, OnInit } from "@angular/core";
import { HeroModel } from "../../models/hero.model";
import { NgForm } from "@angular/forms";
import { FirebaseService } from "../../services/firebase.service";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Observable } from "rxjs";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"]
})
export class HeroComponent implements OnInit {
  hero: HeroModel = new HeroModel();
  loading: boolean;

  constructor(
    private firebase: FirebaseService,
    private route: ActivatedRoute
  ) {
    this.hero.status = true;
    this.loading = true;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id !== "new") {
      this.firebase.getHero(id).subscribe((resp: HeroModel) => {
        this.hero = resp;
        this.hero.id = id;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  updateForm(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: "Waiting",
      text: "Wait a moment please!",
      icon: "info"
    });
    Swal.showLoading();

    let option: Observable<any>;

    if (this.hero.id) {
      option = this.firebase.updateHero(this.hero);
    } else {
      option = this.firebase.createHero(this.hero);
    }

    option.subscribe((resp: any) => {
      Swal.fire({
        title: "Ok",
        text: `Correct update! to ${resp.name}`,
        icon: "success"
      });
    });
  }
}
