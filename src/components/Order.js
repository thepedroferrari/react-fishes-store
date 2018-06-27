import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    // First check if there is a fish, then check if it is available.
    // Since the data is coming from a database, it takes a split second for it to load into the app. We cannot check for the status of something that doesn't exist yet.
    const isAvailable = fish && fish.status === 'available';

    // Make sure the fish is loaded before we continue
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : fish} is no longer available;
        </li>
      );
    }
    return (
      <li key={key}>
        {count} lbs {fish.name} [ {formatPrice(count * fish.price)} ]
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
