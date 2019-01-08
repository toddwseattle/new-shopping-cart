import React, { Component } from "react";
import "./App.css";
import Catalog from "./containers/Catalog";

class App extends Component {
  constructor(props) {
    super(props);
    import("./static/data/products.json").then(json => {
      this.setState(state => {
        return { ...state, products: json.products };
      });
    });
    this.state = {
      products: []
    };
  }
  render() {
    return <Catalog products={this.state.products} />;
  }
}

export default App;
