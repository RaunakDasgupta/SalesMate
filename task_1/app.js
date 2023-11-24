const contactRouter=require('./routes/contact.js');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/contact",contactRouter);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
