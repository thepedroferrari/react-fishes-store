import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount () {
    const {params} = this.props.match;
    // 1. Reinstate our local Storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState (`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentWillUnmount () {
    base.removeBinding (this.ref);
  }

  componentDidUpdate () {
    localStorage.setItem (
      this.props.match.params.storeId,
      JSON.stringify (this.state.order)
    );
  }

  addFish = fish => {
    // 1. Take a copy of the existing state (avoid mutation)
    const fishes = {...this.state.fishes};

    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now ()}`] = fish;

    // 3. Set the new fishes object to state
    this.setState ({fishes}); // ES6 new object method, if the key/val have the same name, you can pass just the key without the :.

    console.log ('Adding a Fish!');
  };

  loadSampleFishes = () => {
    this.setState ({fishes: sampleFishes});
  };

  addToOrder = key => {
    // 1. take a copy of state
    const order = {...this.state.order};

    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;

    // 3. Call setState to update our state object
    this.setState ({order});
  };

  render () {
    return (
      <React.Fragment>
        <div className="catch-of-the-day">
          <nav className="menu">
            <Header tagline="Fresh Seafood Market" />
            <ul className="fishes">
              {Object.keys (this.state.fishes).map (key => (
                <Fish
                  key={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                  index={key}
                />
              ))}
            </ul>
          </nav>
          <Order fishes={this.state.fishes} order={this.state.order} />
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
