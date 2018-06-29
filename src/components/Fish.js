import React from 'react';
import PropTyoes from "prop-types";
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  static propTypes = { // static = don't make a copy for each iteration.
    detail: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
    deleteFish: PropTypes.func
  }
  render() {
    // ES6 Destructuring
    const { image, name, price, status, desc } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
          {isAvailable ? 'Add To Cart' : 'Sold Out!'}
        </button>
        <button onClick={() => {this.props.deleteFish(this.props.index)}}>Delete Fish</button>
      </li>
    );
  }
}

export default Fish;
