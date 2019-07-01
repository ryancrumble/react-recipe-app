import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = 'be9485d9e537a0228a7dc2b93e2d9925';

export class Recipe extends Component {
  state = {
    activeRecipe: []
  };

  componentDidMount = async () => {
    const title = this.props.location.state.recipe;

    const req = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${title}`
    );

    const res = await req.json();
    this.setState({ activeRecipe: res.recipes[0] });
    console.log(this.state.activeRecipe);
  };

  render() {
    const { activeRecipe } = this.state;
    return (
      <div className="container">
        {activeRecipe.length !== 0 && (
          <div className="active-recipe">
            <img
              src={activeRecipe.image_url}
              alt={activeRecipe.title}
              className="active-recipe__img"
            />
            <h3 className="active-recipe__title">{activeRecipe.title}</h3>
            <h4 className="active-recipe__publisher">
              Publisher: <span>{activeRecipe.publisher}</span>
            </h4>
            <p className="active-recipe__website">
              Website:{' '}
              <span>
                <a href={activeRecipe.source_url}>
                  {activeRecipe.publisher_url}
                </a>
              </span>
            </p>
            <button className="active-recipe__button">
              <Link to="/">Back To Search</Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Recipe;
