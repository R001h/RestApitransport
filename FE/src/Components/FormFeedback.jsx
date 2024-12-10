import React, { useState, useEffect } from 'react';
import FeedbackService from '../Services/FeedbackService';
import StarRatings from 'react-star-ratings';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar las reseñas al cargar el componente
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await FeedbackService.obtenerFeedback();
        setFeedbacks(response);
      } catch (err) {
        setError('Error al cargar las reseñas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = {
      rating,
      comment,
      order: 1,  // Asegúrate de que este id de order sea válido
      client: 1, // Asegúrate de que este id de client sea válido
    };

    try {
      setLoading(true);
      const response = await FeedbackService.crearFeedback(feedback);
      setFeedbacks([...feedbacks, response]);
      setRating(0);
      setComment('');
      alert('Reseña enviada con éxito');
    } catch (err) {
      setError('Error al enviar la reseña.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await FeedbackService.eliminarFeedback(id);
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
      alert(response.message);
    } catch (err) {
      setError('Error al eliminar la reseña.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Reseñas de Feedback</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Calificación:</label>
          <StarRatings
            rating={rating}
            starRatedColor="yellow"
            changeRating={handleRatingChange}
            numberOfStars={5}
            name="rating"
            starDimension="30px"
            starSpacing="5px"
          />
        </div>
        <div>
          <label>Comentario:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>Enviar Reseña</button>
      </form>

      <h3>Lista de Reseñas</h3>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <StarRatings
                rating={feedback.rating}
                starRatedColor="yellow"
                starDimension="20px"
                starSpacing="3px"
              />
              <p>{feedback.rating} estrellas - {feedback.comment}</p>
              <button onClick={() => handleDelete(feedback.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay reseñas aún.</p>
      )}
    </div>
  );
};

export default Feedback;