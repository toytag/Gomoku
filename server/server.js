const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

// start server
if (require.main === module) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Server running on port: ${port}`));
}