import { useAppKitProvider } from "@reown/appkit/react";
import { ethers } from 'ethers';
import UserProjectABI from "../artifacts/contracts/UserProject.sol/UserProject.json";

const USERPROJECT_ADDRESS = "0x2Fe28e60d6272e833CeC32F6b1cdC9D4eE8744bd";

export const useContracts = () => {
  const { walletProvider } = useAppKitProvider('eip155');

  const initializeEthers = async () => {
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = ethersProvider.getSigner();
    return { ethersProvider, signer };
  };

  const getProjectContract = async () => {
    const { signer } = await initializeEthers();
    return new ethers.Contract(USERPROJECT_ADDRESS, UserProjectABI.abi, signer);
  };

  const getProjects = async () => {
    const contract = await getProjectContract();
    const projects = await contract.getProjects();
    console.log(projects);
    return projects;
  }

  const createProject = async (cid, url, name, description) => {
    const contract = await getProjectContract();
    const createTX = await contract.addProject(cid, url, name, description);
    await createTX.wait();
    return createTX;
  }

  return { getProjects, createProject };
}