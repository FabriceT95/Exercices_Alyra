import React, { Component } from "react";
import PlaceDeMarche from "./contracts/PlaceDeMarche.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PlaceDeMarche.networks[networkId];
      const instance = new web3.eth.Contract(
        PlaceDeMarche.abi,
        deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <>
      <Header />
        <Content />
        </>
    );
  }
}


export default App;


class Header extends React.Component{
  render(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">PLACE DE MARCHE</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Inscription<span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Offres</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Livraison</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Signalement</a>
              </li>
            </ul>
        </div>
      </nav>

  )
}
}



class Content extends React.Component{
  render(){
    return(
        <>
          <div style={{display:'block'}}>
        <Inscription />
          </div>
          <div style={{display:'none'}}>
            <Offre />
          </div>
        </>
    )
  }
}


class Inscription extends React.Component{
  render(){
    return(

        <div className="container">
          <div className="row">
            <div className="col-sm">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Votre nom</label>
                <input type="text" className="form-control" id="exampleInputEmail1"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        </div>


    )
  }
}

class Offre extends React.Component{
  render(){
    return(

        <div className="container">
          <div className="row">
            <div className="col-sm">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">OFFRE</label>
                  <input type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>


    )
  }
}
