import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HerosComponent } from "./components/heros/heros.component";
import { HeroComponent } from "./components/hero/hero.component";
import { LoadingComponent } from './components/shared/loading/loading.component';
import { NodataComponent } from './components/shared/nodata/nodata.component';

@NgModule({
  declarations: [AppComponent, HerosComponent, HeroComponent, LoadingComponent, NodataComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
