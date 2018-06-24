import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };
  addFish = (fish) => {
    // 1. Take a copy of the existing state (avoid mutation)
    const fishes = { ...this.state.fishes };

    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;

    // 3. Set the new fishes object to state
    this.setState({ fishes }); // ES6 new object method, if the key/val have the same name, you can pass just the key without the :.

    console.log('Adding a Fish!');
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };
  render() {
    return (
      <React.Fragment>
        <div className="catch-of-the-day">
          <nav className="menu">
            <Header tagline="Fresh Seafood Market" />
          </nav>
          <Order />
          <Inventory
            addFish={this.addFish}
            loadSampleFishes={this.loadSampleFishes}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
