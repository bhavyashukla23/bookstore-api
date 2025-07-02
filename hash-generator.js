//for generating a hashed password for user "rahul@example.com"
const bcrypt = require('bcryptjs');

(async () => {
  const hash = await bcrypt.hash('rahul123', 10);
  console.log('Hashed password:', hash);
})();
