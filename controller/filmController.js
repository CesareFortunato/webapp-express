// importo la connessione del DB
const connection = require('../data/db');


//funzione index

function index(req, res) {

  //preparo la query
  const sql = 'SELECT * FROM movies';

  // eseguire la query
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });

    res.json(results);
  });

}



//funzione show

function show(req, res) {
  const { id } = req.params;

  const sqlFilm = 'SELECT * FROM movies WHERE id = ?';
  const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?';

  connection.query(sqlFilm, [id], (err, filmResults) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (filmResults.length === 0) return res.status(404).json({ error: 'Film not found' });

    const film = filmResults[0];

    connection.query(sqlReviews, [id], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: 'Database query failed' });

      res.json({
        ...film,
        reviews: reviewResults
      });
    });
  });
}


//funzione store delle reviews

function storeReview(req, res) {
  const { id } = req.params;

  //recupero info dal body
  const { name, text, vote } = req.body;


  //settiamo sql per DB
  const reviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'
  connection.query(reviewSql, [text, name, vote, id], (err, filmResults) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.status(201);
    res.json({message: 'Review added', id: filmResults.insertID})

   
  })
}


module.exports = { index, show, storeReview }