import { FileOperations } from '../common/fileOperations';

export class MusicFestivalController {
  public fetchMusicFestivalReport = (req, res) => {
    const data = FileOperations.loadContentFromDataFile(req, 'musicFestival', 'response.json');
    if (data) {
      res.status(data.status).json(data.body);
    } else {
      console.warn(`No mock data`);
      res.status(404).json({ message: `Mock data file not located` });
    }
  };
}
