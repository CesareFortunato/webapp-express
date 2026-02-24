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


module.exports = { index, show }