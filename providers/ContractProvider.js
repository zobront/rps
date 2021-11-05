import { ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"

import ContractArtifact from '../artifacts/contracts/Contract.sol/Contract.json';
import { useEthereum } from "./EthereumProvider"

const ContractContext = createContext()

// NOTE: Replace instances of "Contract" with uppercase, and "Contract" with lowercase instance

const ContractProvider = (props) => {
  const { provider } = useEthereum()
  const [contracts, setContracts] = useState([])

  function addContract(name, contract) {
    let newContracts = [...contracts]
    newContracts[name] = contract
    setContracts(newContracts)
  }

  useEffect(() => {
    const Contract = new ethers.Contract(
      '0x490e1ea9a5547a1ad6FbCbCAa62CF5Ab47CeF7c9',
      ContractArtifact.abi,
      provider
    )
    addContract("contract", Contract)
  }, [])

  const variables = { contracts }
  const functions = { addContract }

  const value = { ...variables, ...functions }

  return <ContractContext.Provider value={value} {...props} />
}

export const useContract = () => {
  return useContext(ContractContext)
}

export default ContractProvider