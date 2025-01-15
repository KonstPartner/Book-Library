import app from './app.ts';
import { PORT } from './config/config.ts';

app.listen(PORT, () => {
  console.log(`Library API is listening on port ${PORT}`);
});
