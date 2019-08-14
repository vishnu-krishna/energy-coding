import { Component, OnInit } from '@angular/core';
import { IMusicFestivalService } from '../../services/musicFestivalService';
import { MusicFestivalViewModel } from '../../model/musicFestivalViewModel';
import { ViewModelMusicFestival } from '../../model';

@Component({
  selector: 'ea-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  public musicFestivalResults: ViewModelMusicFestival[];
  public error: boolean = false;

  constructor(private musicFestivalService: IMusicFestivalService) {}

  public ngOnInit() {
    this.musicFestivalService.fetchMusicFestivalReport().subscribe((response) => {
      this.musicFestivalResults = new MusicFestivalViewModel(response).constructMusicFestivalData;
    }, (error) => {
      this.error = true;
      console.log(`Unable to fetch the results ${error}`);
    });
  }
}
