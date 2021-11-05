import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { Button } from 'semantic-ui-react'

import { useState, useEffect } from 'react';
import { useEthereum } from "../providers/EthereumProvider"
import { useContract } from "../providers/ContractProvider"

const Home = () => {
  const router = useRouter()
  const { provider, signer, address } = useEthereum();
  const { contracts } = useContract();
  const { contract } = contracts;

  const [contractState, setContractState] = useState();
  const [balance, setBalance] = useState();

  useEffect(async () => {
    if (contract && address.length > 0) {
      setContractState(contract);
      let bal = await contract.balances(address)
      setBalance(bal.toNumber())
    }
  })

  const bet = async (selection) => {
    await contract.connect(signer).bet(10, selection);
    router.push('/')
  }

  
  return (
    <Layout>
      <h1>Rock Paper Scissors</h1>
      <p>Current Balance: {balance}</p>
      <button onClick={() => bet(0)}>Rock (0)</button>
      <button onClick={() => bet(1)}>Paper (1)</button>
      <button onClick={() => bet(2)}>Scissors (2)</button>
    </Layout>
  );
}

export default Home;