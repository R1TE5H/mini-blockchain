//* Import the Bcrypt Library
const bcrypt = require("bcrypt");

//* Create the Block Structure or Class
class Block {
  //* Create the Constructor --> Contains the Block Information
  constructor(blockID, previousHash, data) {
    //* Contains the Block's ID, Timestamp, Hash, Previous Block's Hash, All Transactions

    this.blockID = blockID;
    this.timeStamp = Date.now();
    this.blockHash = this.getHash();
    this.prevHash = previousHash;
    this.data = data;
  }

  //* Creates and Returns this Block's Hash
  getHash() {
    return bcrypt.hashSync(
      String(
        this.blockID +
          this.timeStamp +
          this.blockHash +
          this.prevHash +
          JSON.stringify(this.data)
      ),
      10
    );
  }
}

//* Create a Blockchain Structure or Class
class BlockChain {
  //* Create a Constructor --> Create the Chain
  constructor() {
    //* A List to Contain Each Block of the Chain
    this.chain = [];
  }

  //* Method to Add a New Block to the Blockchain
  addBlock(data) {
    //* Variable to Help Index the Blocks (Starting at Zero)
    let blockID = this.chain.length;
    //* Checks to See if Its the First Block --> If it is then the Previous Has is Empty, If Not it Will Take the Previous Hash
    let previousHash =
      this.chain.length !== 0
        ? this.chain[this.chain.length - 1].blockHash
        : "";
    //* Creates a Block
    let block = new Block(blockID, previousHash, data);

    this.chain.push(block);
  }
}

const MyFirstBlockchain = new BlockChain();

MyFirstBlockchain.addBlock({
  sender: "Ritesh",
  receiver: "Persaud",
  amount: 5416,
}); // First Transaction
MyFirstBlockchain.addBlock({
  sender: "Matthew",
  receiver: "Frank",
  amount: 7986,
}); // Second Transaction
MyFirstBlockchain.addBlock({
  sender: "Isabel",
  receiver: "Catherine",
  amount: 9863,
}); // Third Transaction

console.log(JSON.stringify(MyFirstBlockchain, null, 6));
