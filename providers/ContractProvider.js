import { ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"

import ContractArtifact from '../artifacts/contracts/Contract.sol/Contract.json';
import { useEthereum } from "./EthereumProvider"

const ContractContext = createContext()

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
      '0xf498B350002f19ec144d8383dd02aDa5096D50E9',
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