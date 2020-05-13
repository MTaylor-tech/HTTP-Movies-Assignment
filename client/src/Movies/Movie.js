import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const [redirect, setRedirect] = useState(false);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = (id) => {
      if (window.confirm('Are you sure?')){
        axios
        .delete(`http://localhost:5001/api/movies/${id}`)
        .then((res)=> {
          console.log(res);
          setRedirect('/');
        })
        .catch((err)=>console.log(err.response));
      }
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="edit-button" onClick={()=>setRedirect(`/update-movie/${movie.id}`)}>
        Edit
      </div>

      <div className="delete-button" onClick={()=>deleteMovie(movie.id)}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
