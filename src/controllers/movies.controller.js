const { response, request } = require("express");
const Movie = require("../models/movie.model");

const getMoviesController = async (req = request, res = response) => {
  try {
    const count = await Movie.count();
    const { limit = count, skip = 0 } = req.query;
    const movies = await Movie.find().skip(+skip).limit(+limit);
    res.status(200).json({ success: true, movies, count });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador", error });
  }
};

const getMovieController = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(204).json({ success: false, movie: {} });
    }
    res.status(200).json({ success: true, movie });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador", error });
  }
};

const postMoviesController = async (req = request, res = response) => {
  try {
    const { name, description, urlImage } = req.body;
    const movie = new Movie({ name, description, urlImage });
    await movie.save();
    res
      .status(201)
      .json({ success: true, msg: "Película creado correctamente", movie });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador", error });
  }
};

const putMoviesController = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const movie = await Movie.findByIdAndUpdate(id, resto);

    res.status(200).json({
      success: true,
      msg: "Película Actualizado correctamente.",
      movie,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador".error });
  }
};

const deleteMoviesController = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      msg: "Película borrada correctamente.",
      movie,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador".error });
  }
};

module.exports = {
  getMoviesController,
  postMoviesController,
  putMoviesController,
  deleteMoviesController,
  getMovieController,
};
