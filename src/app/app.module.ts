import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { HttpClientModule } from '@angular/common/http';
import { IMusicFestivalService, MusicFestivalService } from './services/musicFestivalService';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: IMusicFestivalService, useClass: MusicFestivalService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
