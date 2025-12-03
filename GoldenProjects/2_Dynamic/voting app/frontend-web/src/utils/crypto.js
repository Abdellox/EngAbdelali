import { ethers } from 'ethers';

export const generateKeyPair = async () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    address: wallet.address
  };
};

export const encryptVote = async (candidateId) => {
  // In production, use proper encryption with voter's public key
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify({ candidateId, timestamp: Date.now() }));
  
  // Simulate encryption (use Web Crypto API in production)
  const encrypted = btoa(String.fromCharCode(...data));
  return encrypted;
};

export const signVote = async (encryptedVote) => {
  // In production, sign with voter's private key
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const message = ethers.hashMessage(encryptedVote);
  const signature = await signer.signMessage(encryptedVote);
  
  return signature;
};

export const verifySignature = (message, signature, address) => {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    return false;
  }
};

export const hashData = (data) => {
  return ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(data)));
};
