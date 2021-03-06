#!/usr/bin/env node
require('dotenv').config();

const { BlobServiceClient } = require("@azure/storage-blob");

const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(storageAccountConnectionString);

function main() {
    console.log('Hello, World!');
}

async function main() {
   // Create a container (folder) if it does not exist
  const containerName = 'photos';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = await containerClient.createIfNotExists();
  console.log(`Create container ${containerName} successfully`, createContainerResponse.succeeded);

  // Upload image
  const filename = 'docs-and-friends-selfie-stick.png';
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  blockBlobClient.uploadFile(filename);

  // Check Image upload
  let blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    console.log(`${blob.name} --> Created: ${blob.properties.createdOn}   Size: ${blob.properties.contentLength}`);
  }
}

main();