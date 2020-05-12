import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateMovie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const updateMovie = (id) => {
    axios
      .put(`http://localhost:5001/api/movies/${id}`, movie)
      .then((res) =>{
        console.log(res);
        props.history.push(`/movies/${id}`);
      })
      .catch((err) => console.log(err.response));
  };

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <label htmlFor="title">Title: </label>
        <input name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
        <div className="movie-director">
          <label htmlFor="director">Director: </label>
          <input name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
        </div>
        <div className="movie-metascore">
          <label htmlFor="metascore">Metascore: </label>
          <input name="metascore" placeholder="Metascore" value={movie.metascore} onChange={handleChange} />
        </div>
        <h3>Actors</h3>

        {movie.stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>

      <div className="save-button" onClick={()=>updateMovie(params.id)}>
        Save
      </div>
    </div>
  );
}

export default UpdateMovie;
