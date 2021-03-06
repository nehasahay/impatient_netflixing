import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import RouletteWheel from "../components/RouletteWheel";
import { Row, Col, Container } from "react-bootstrap";
import MovieCard from "../components/MovieCard.js";
import API from "../utils/API";

const movieGenres = [
  "Action & Adventure",
  "Anime Features",
  "Children & Family Movies",
  "Classic Movies",
  "Comedies",
  "Cult Movies",
  "Documentaries",
  "Dramas",
  // "Faith & Spirtuality",
  "Horror Movies",
  "Independent Movies",
  "International Movies",
  "LGBTQ Movies",
  "Music & Musicals",
  "Romantic Movies",
  "Sci-Fi & Fantasy",
  "Sports Movies",
  "Stand-Up Comedy",
  "Thrillers"
];

export class Roulette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  loadOptions() {
    // Shuffle array
    const shuffled = movieGenres.sort(() => 0.5 - Math.random());

    // Get sub-array of first 6 elements after shuffled
    let selected = shuffled.slice(0, 6);
    return selected;
  }

  handleOnComplete = value => {
    console.log(value);
    API.findTitleByGenre(value).then(result => {
      //TODO: Movies are loaded in result.data array
      let randomMovie = Math.floor(Math.random() * result.data.length);
      this.setState({ movie: result.data[randomMovie] });
      console.log(this.state.movie);
      // console.log(result.data[randomMovie]);
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="jumbotron-name">IMPATIENT NETFLIXING</h1>
              <h2 className="instructions">
                Spin the Wheel to Decide What to Watch
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Container className="container">
          <Row>
            <Col sm={5}>
              <h3>Genre:</h3>
              <br />
              <RouletteWheel
                options={this.loadOptions()}
                baseSize={265}
                onComplete={this.handleOnComplete}
              />
            </Col>
            <Col sm={2} />
            <Col className="result" sm={5}>
              <h3>Results:</h3>
              <br />
              <br />
              <MovieCard data={this.state.movie} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Roulette;
