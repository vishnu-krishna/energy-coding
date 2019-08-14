import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './Routes/routes';
import * as proxy from 'express-http-proxy';
import * as cors from 'cors';

export class App {
  public app: express.Application;
  public energyAustraliaRoutes: Routes = new Routes();

  constructor(private proxyPort: string) {
    this.app = express();
    this.app.use(cors());
    this.energyAustraliaRoutes.routes(this.app);
    this.config();
  }

  private config(): void {
    // This would be needed when we do post later on in our application so that the requests are parsed in JSON format.
    this.app.use(bodyParser.json());

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/', proxy(`localhost:${this.proxyPort}`));
  }
}

