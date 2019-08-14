import { App } from './app';

const PORT = 3000;

const redirectPort = process.argv[2] || '4200';
const app: App = new App(redirectPort);

app.app.listen(PORT, () => {
  console.log(`Energy Australia Mock Server listening on port ${PORT} redirecting to ${redirectPort}(Angular Port)`);
});
