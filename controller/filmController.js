// importo la connessione del DB
const connection = require('../data/db');
const imagePath = require('../middlewares/imagePath');


//funzione index

function index(req, res) {

  //preparo la query
  const sql = 'SELECT * FROM movies';

  // eseguire la query
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });

    const movies = results.map((movie => {
      return {
        ...movie,
        image: req.imagePath + movie.image
      }

    }))
    res.json(movies);
  });

}



//funzione show

function show(req, res) {
  const { id } = req.params;

  const sqlMovie = 'SELECT * FROM movies WHERE id = ?';
  const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?';

  connection.query(sqlMovie, [id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

    const movie = movieResults[0];

    movie.image = req.imagePath + movie.image

    connection.query(sqlReviews, [id], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: 'Database query failed' });

      res.json({
        ...movie,
        reviews: reviewResults
      });
    });
  });
}


//funzione store delle reviews

function storeReview(req, res) {
  const { id } = req.params;
  const { name, text, vote } = req.body;

  if (!name || !text || vote == null) {
    return res.status(400).json({ error: "Missing fields: name, text, vote" });
  }

  const reviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)';
  connection.query(reviewSql, [text, name, vote, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });

    return res.status(201).json({ message: 'Review added', id: result.insertId });
  });
}


module.exports = { index, show, storeReview }