/**
 *Submitted for verification at BscScan.com on 2023-01-19
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StructExample{
    
    struct Book {
        uint256 id;
        string title;
        string author;
        uint256 datePublished;
        string url;
    }
    uint256 public id = 0;
    //array
    
    Book[] public books;
    mapping (address => Book) bookMap;

    function buyBook(uint _id) public {
        bookMap[msg.sender] = books[_id];
    }

    function myBook() public view returns (Book memory _book){
        return bookMap[msg.sender];
    }

    function addBook(string memory title, string memory author, uint256 datePublished, string memory url) public{
        //books.push(Book(id++, title, author, datePublished));
        Book memory newBook = Book({ author: author, id: id++, title: title, datePublished: datePublished, url:url});
        books.push(newBook);
        
    }

    function getBookDetails(uint256 _id) public view returns (string memory title, string memory author,
        uint256 datePublished, string memory url){ 

        Book memory _book = books[_id];
        return (_book.title, _book.author, _book.datePublished, _book.url);
    }

    function getBook(uint256 _id) public view returns (Book memory _book){
        return books[_id];
    }

   
    function getAllBooks() public view returns (Book[] memory _books){
        return books;
    }

}