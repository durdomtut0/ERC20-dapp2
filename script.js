//Change UI
//Add books to library
//Return all books

//Cntl+Shift+L
const BookContract = "0xf3280778735C8b7339Cda0C49fa61F49a089885E";
const BookContractABI = [{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"author","type":"string"},{"internalType":"uint256","name":"datePublished","type":"uint256"},{"internalType":"string","name":"url","type":"string"}],"name":"addBook","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"buyBook","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"books","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"author","type":"string"},{"internalType":"uint256","name":"datePublished","type":"uint256"},{"internalType":"string","name":"url","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllBooks","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"author","type":"string"},{"internalType":"uint256","name":"datePublished","type":"uint256"},{"internalType":"string","name":"url","type":"string"}],"internalType":"struct StructExample.Book[]","name":"_books","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getBook","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"author","type":"string"},{"internalType":"uint256","name":"datePublished","type":"uint256"},{"internalType":"string","name":"url","type":"string"}],"internalType":"struct StructExample.Book","name":"_book","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getBookDetails","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"author","type":"string"},{"internalType":"uint256","name":"datePublished","type":"uint256"},{"internalType":"string","name":"url","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"id","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myBook","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"author","type":"string"},{"internalType":"uint256","name":"datePublished","type":"uint256"},{"internalType":"string","name":"url","type":"string"}],"internalType":"struct StructExample.Book","name":"_book","type":"tuple"}],"stateMutability":"view","type":"function"}]
let Contract;
let signer;

async function connectWallet(){
    if (!signer){
        //Provider = RPC Node in a blockchain
        const provider = new ethers.providers.Web3Provider(window.ethereum, 97);
        // provider = https://indulgent-newest-leaf.bsc-testnet.discover.quiknode.pro/8a8483b20d028a2b4ca603f1f86a6f1d702a6624/
        await provider.send("eth_requestAccounts", []).then(() => {//request accounts
            provider.listAccounts().then((accounts) => {//have access to list of accounts
                signer = provider.getSigner(accounts[0]);//access your connected account
                Contract = new ethers.Contract(
                    BookContract,
                    BookContractABI,
                    signer
                );//Create JS object of smart-contract existing on blockchain
            });
        });
        const walletStatus = document.getElementById("walletStatus");
        walletStatus.innerText = "disconect"

    }
    if (signer){
        //Make it work with real disconnect
        //provider = null;
        //signer = null;
        console.log("signer", signer)
        console.log("disconnect")
        const walletStatus = document.getElementById("walletStatus");
        walletStatus.innerText = "Connect Metamask"
        await displayBooks();
    }
    

}

async function addBook(){
    const inputBookName = document.getElementById("inputBookName").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookUrl = document.getElementById("inputBookUrl").value;

    const addBook = Contract.addBook(inputBookName, inputBookAuthor, inputBookYear, inputBookUrl)
    await displayBooks();
}

async function displayBooks(){
    const books = await Contract.getAllBooks();
    console.log(books)
    let booksRow = document.getElementById("booksRow");
    let bookTemplate = document.getElementById("bookTemplate");

    for (let i=0; i<books.length;i++){
        console.log(books[i])
        bookTemplate.querySelector('.card-title').textContent = books[i].title; 
        bookTemplate.querySelector('.card-author').textContent = books[i].author;
        bookTemplate.querySelector('.card-id').textContent = books[i].id;
        bookTemplate.querySelector('.card-image').src = books[i].url;

        let bookTemplateVisible = bookTemplate.innerHTML;
        booksRow.innerHTML+=bookTemplateVisible;

    }

    //Look into innerHTML to inject card div into Page

}

async function buyBook(){
    console.log(booksRow.querySelector('.card-id').textContent)
    let id = booksRow.querySelector('.card-id').textContent

    //const walletStatus = document.getElementById('.card-id');
    Contract.buyBook(id);
    alert("test buy book")
}



