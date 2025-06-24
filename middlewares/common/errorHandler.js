//404 not found handler

const createerror = require("http-errors");

function notFoundHandler(req, res, next) {
  next(createerror(404, "your requested content was not found!"));
}

//deafult error handler

function errorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (!res.locals.html) {
    //html respones
    res.render("error", {
      title: "Error Page",
    });
  } else {
    //json response
    res.json({
      error: res.locals.error,
    });
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
