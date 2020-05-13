import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";

function UpdateMovie({history}) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const [redirect, setRedirect] = useState(null);
  const [stars, setStars] = useState([]);

  const updateMovie = (id) => {
    axios
      .put(`http://localhost:5001/api/movies/${id}`, movie)
      .then((res) =>{
        console.log(res);
        setRedirect(`/`);
      })
      .catch((err) => console.log(err.response));
  };

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setStars(res.data.stars);
      })
      .catch((err) => console.log(err.response));
  };

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleStarChange = (i,e) => {
    if (movie != null) {
      const newStars = stars.map((s,index)=>{
        if (index!==i) {
          return s;
        } else {
          return e.target.value;
        }
      });
      setStars(newStars);
      setMovie({
        ...movie,
        stars: newStars
      });
    }
  };

  const handleNewStar = e => {
    setStars([...stars, ""]);
    setMovie({
      ...movie,
      stars: [...stars, ""]
    });
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

        {stars.map((star, index)=> (
          <div key={index} className="movie-star">
            <input name={index} id={index} value={star} onChange={(event)=>handleStarChange(index, event)} />
          </div>
        ))}
        <div className="movie-star">
          <i className="fa fa-plus" onClick={handleNewStar} />
        </div>
      </div>

      <div className="save-button" onClick={()=>updateMovie(params.id)}>
        Save
      </div>
    </div>
  );
}

export default UpdateMovie;
