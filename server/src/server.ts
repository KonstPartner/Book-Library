import app from './app.ts';
import { PORT } from './config/config.ts';
import setupAssociations from './models/associations.ts';

setupAssociations();

app.listen(PORT, () => {
  console.log(`Library API is listening on port ${PORT}`);
});
