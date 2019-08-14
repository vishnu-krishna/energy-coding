import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiModelMusicFestival } from '../model';

export abstract class IMusicFestivalService {
  public abstract fetchMusicFestivalReport(): Observable<ApiModelMusicFestival[]>;
}

@Injectable()
export class MusicFestivalService implements IMusicFestivalService {
  constructor(private http: HttpClient) {}

  public fetchMusicFestivalReport(): Observable<ApiModelMusicFestival[]> {
    return this.http.get<ApiModelMusicFestival[]>(environment.apiEndpoint + '/api/v1/festivals');
  }
}
