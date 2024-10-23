//  src/controllers/authController.js

const db = require('../models/db');

// Função de login
exports.login = (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    
    if (results.length > 0) {
      const user = results[0];
      req.session.user = user;  // Armazenar dados do usuário na sessão
      res.redirect('/dashboard');
    } else {
      res.status(401).render('login', { error: 'Credenciais inválidas' });
    }
  });
};

// Função de logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

