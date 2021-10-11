/* eslint-disable */
import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import DaiTokenMock from '../abis/DaiTokenMock.json'

class App extends Component {
	async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const daiTokenAddress = "0xcaC8b0EB18829a4f63eC0ef97BB23136d15E3afC" // Replace DAI Address Here
    const daiTokenMock = new web3.eth.Contract(DaiTokenMock.abi, daiTokenAddress)
    this.setState({ daiTokenMock: daiTokenMock })
    const balance = await daiTokenMock.methods.balanceOf(this.state.account).call()
    this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') })
    const transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
    this.setState({ transactions: transactions })
    console.log('>>> transactions: ', transactions)
  }

  // transfer(recipient, amount) {
  //   this.state.daiTokenMock.methods.transfer(recipient, amount).send({ from: this.state.account })
  // }

	constructor(props) {
    super(props)
    this.state = {
      account: '',
      daiTokenMock: null,
      balance: 0,
      transactions: []
    }

    // this.transfer = this.transfer.bind(this)
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
