import { MusicFestivalController } from '../controllers/musicFestivalController';

export class Routes {
  public musicFestivalController: MusicFestivalController = new MusicFestivalController();

  public routes(app): void {
    // Music Controller routes
    app.route('/api/v1/festivals')
       .get(this.musicFestivalController.fetchMusicFestivalReport);
  }
}
