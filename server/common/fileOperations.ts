import * as path from 'path';
import * as fs from 'fs';

const baseMockDataPath = `../__mockData/`;

export class FileOperations {

  public static baseMockDataPath: string = baseMockDataPath;

  public static loadPdfFile(req, res, hostKey, filename): any {
    const absoluteFolder = path.join(__dirname, baseMockDataPath);

    const targetFile = path.join(absoluteFolder, hostKey, filename);

    const absTargetFile = path.resolve(targetFile);

    let fileToLoad = ``;

    if (fs.existsSync(absTargetFile) && fs.statSync(absTargetFile).isFile()) {
      fileToLoad = absTargetFile;
    }
    if (fileToLoad.length > 0) {
      const file = fs.createReadStream(fileToLoad);
      const fileSize = fs.statSync(fileToLoad);
      return {
        file,
        fileSize
      };
    } else {
      FileOperations.logFileNotFound(req.url, targetFile);
      return undefined;
    }

  }

  public static loadFile(filename): any {
    if (fs.existsSync(filename)) {
      FileOperations.logFileFound(filename);
      const buffer = fs.readFileSync(filename).toString();
      const data = JSON.parse(buffer);
      if (data && data.status && data.body) {
        return data;
      } else {
        return {
          status: 200,
          headers: [],
          body: data
        };
      }
    } else {
      console.warn(`Could not load mock data file: ${filename}`);
      return undefined;
    }
  }

  public static loadContentFromDataFile(req, hostKey, filename): any {
    const absoluteFolder = path.join(__dirname, baseMockDataPath);

    const targetFile = path.join(absoluteFolder, hostKey, filename);

    const absTargetFile = path.resolve(targetFile);

    let fileToLoad = ``;

    if (fs.existsSync(absTargetFile) && fs.statSync(absTargetFile).isFile()) {
      fileToLoad = absTargetFile;
    }

    if (fileToLoad.length > 0) {
      return this.loadFile(fileToLoad);
    } else {
      FileOperations.logFileNotFound(req.url, targetFile);
      return undefined;
    }
  }

  private static logFileFound(filePath: string): void {
    console.log('Loading file...', filePath);
  }

  private static logFileNotFound(url: string, targetFile: string): void {
    console.error('No suitable file found');
    console.error('Url:', url);
    console.error('TargetFile:', targetFile);
  }
}
