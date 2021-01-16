require('dotenv').config(); // importa las variables que estan en .env
const app = require('./app');
require('./database');

const port = app.get('port');
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
