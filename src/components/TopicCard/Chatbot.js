import React, { useEffect } from 'react'
import "./chatbot.css";

function Chatbot() {

    useEffect(() => {
        firstBotMessage();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const coll = document.querySelectorAll(".collapsible");

        coll.forEach((item) => {
            item.addEventListener("click", function () {
                this.classList.toggle("active");

                const content = this.nextElementSibling;

                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }, []);


    const getTime = () => {
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let time = hours + ":" + minutes;
        return time;
    };

    const getBotestResponse = (userText) => {
        // Convert user input to lowercase for case-insensitive matching
        const lowerUserText = userText.toLowerCase();

        // Define your custom questions and corresponding answers
        const customResponses = {

            "hi hello": "Hi there! How can I assist you?",
        "your name": "I'm a chatbot. You can call me ChatBot!",
        "array": "An array is a data structure that stores a collection of elements, each identified by an index or a key. It provides a contiguous memory location for efficient access and manipulation of ordered data in a linear fashion.",
        "linkedlist": "A linked list is a linear data structure where elements, called nodes, are connected sequentially. Each node contains data and a reference or link to the next node in the sequence.",
        "stack": "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle, where elements are added and removed from the same end. It supports two main operations: pushing (adding) elements onto the top and popping (removing) elements from the top.",
        "queue": "A queue is a linear data structure that follows the First In, First Out (FIFO) principle, where elements are added at the rear and removed from the front. It supports two main operations: enqueue (adding) elements to the rear and dequeue (removing) elements from the front.",
        "bst binary search tree": "A binary search tree is a hierarchical data structure composed of nodes, each containing a key and two child nodes: left and right. The key in each node is greater than all keys in its left subtree and less than all keys in its right subtree. It allows for efficient searching, insertion, and deletion of elements.",
        "heap": "A heap is a specialized binary tree-based data structure that satisfies the heap property. In a max heap, each parent node is greater than or equal to its children, and in a min heap, each parent node is less than or equal to its children. Heaps are commonly used to implement priority queues and heap sort algorithms.",
        "hash table": "A hash table, also known as a hash map, is a data structure that stores key-value pairs. It uses a hash function to compute an index into an array where the value can be stored or retrieved. Hash tables offer efficient insertion, deletion, and lookup operations, with average-case constant-time complexity.",
        "graph": "A graph is a non-linear data structure composed of a set of vertices (nodes) and a set of edges connecting these vertices. Graphs can be directed or undirected, weighted or unweighted. They are used to model relationships between objects and entities, with applications in various fields such as computer networking, social networks, and route planning algorithms.",
        "dp dynamic programming": "Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems and solving each subproblem only once. It is particularly useful for optimization problems where the solution can be built incrementally by considering the optimal solution to smaller subproblems.",
        "recursion": "Recursion is a programming technique where a function calls itself in order to solve a problem. It is often used to solve problems that can be broken down into smaller instances of the same problem. Recursion relies on the concept of a base case to terminate the recursive calls.",
        "map": "A map, also known as an associative array, dictionary, or hash map, is a data structure that stores a collection of key-value pairs. It allows for efficient insertion, deletion, and lookup operations based on the keys. Maps are commonly used to represent relationships between objects and to store metadata or configuration settings.",
        "minimum spanning tree": "A minimum spanning tree (MST) of a connected, undirected graph is a subgraph that is a tree and connects all the vertices together with the minimum possible total edge weight. MSTs have applications in network design, clustering, and approximation algorithms.",
        "dijkstra Dijkstra's algorithm": "Dijkstra's algorithm is a graph search algorithm used to find the shortest path between a starting vertex and all other vertices in a weighted graph. It works by iteratively selecting the vertex with the smallest distance from the starting vertex and updating the distances to its neighboring vertices. Dijkstra's algorithm guarantees the shortest path if the edge weights are non-negative.",
        "binary search": "Binary search is a search algorithm used to find the position of a target value within a sorted array. It works by repeatedly dividing the search interval in half and comparing the target value with the middle element. If the target value matches the middle element, its position is returned. If the target value is less than the middle element, the search continues on the lower half of the array; if it is greater, the search continues on the upper half. "

            // Add more custom questions and answers as needed
        };

        // Check if there's a custom response for the user's input
        // if (customResponses.hasOwnProperty(lowerUserText)) {
        //     return customResponses[lowerUserText];
        // }
        const keywords = userText.toLowerCase().split(" ");

    // Check for matches with predefined responses
        for (const key in customResponses) {
            if (keywords.some(keyword => key.includes(keyword))) {
                return customResponses[key];
            }
        }
    

        // If no custom response, provide a default response
        return "I'm sorry, I didn't understand that. Can you please ask another question?";
    };

    const firstBotMessage = () => {
        let firstMessage = "Hi, How can I help you?";
        const botStarterMessage = document.getElementById("botStarterMessage");
        botStarterMessage.innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

        let time = getTime();
        const chatTimestamp = document.getElementById("chat-timestamp");
        chatTimestamp.innerHTML = time;

        const userInput = document.getElementById("userInput");
        userInput.scrollIntoView(false);
    };

    const getHardResponse = (userText) => {
        let botResponse = getBotestResponse(userText);
        let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        const chatbox = document.getElementById("chatbox");
        chatbox.innerHTML += botHtml;

        const chatBarBottom = document.getElementById("chat-bar-bottom");
        chatBarBottom.scrollIntoView(true);
    };

    const getResponse = () => {
        let userText = document.getElementById("textInput").value;

        if (userText === "") {
            userText = "I love Code Palace!";
        }

        let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
        document.getElementById("textInput").value = "";

        const chatbox = document.getElementById("chatbox");
        chatbox.innerHTML += userHtml;

        const chatBarBottom = document.getElementById("chat-bar-bottom");
        chatBarBottom.scrollIntoView(true);

        setTimeout(() => {
            getHardResponse(userText);
        }, 1000);
    };

    const sendByEnter = e => {
        e.key === "Enter" && getResponse()
    }

    const sendButton = () => {
        getResponse();
    };

    return (
        <div className="chat-bar-collapsible">
            <button id="chat-button" type="button" className="collapsible">
                Chat with us!
                <i id="chat-icon" style={{ color: "#fff" }} className="fa fa-fw fa-comments-o"></i>
            </button>

            <div className="content">
                <div className="full-chat-block">
                    {/* Message Container */}
                    <div className="outer-container">
                        <div className="chat-container">
                            {/* Messages */}
                            <div id="chatbox">
                                <h5 id="chat-timestamp">00:00</h5>
                                <p id="botStarterMessage" className="botText">
                                    <span>Loading...</span>
                                </p>
                            </div>

                            {/* User input box */}
                            <div className="chat-bar-input-block">
                                <div id="userInput">
                                    <input
                                        id="textInput"
                                        className="input-box"
                                        type="text"
                                        name="msg"
                                        placeholder="Tap 'Enter' to send a message"
                                        onKeyDown={sendByEnter}
                                    />
                                    <p></p>
                                </div>

                                <div className="chat-bar-icons">
                                    <i
                                        id="chat-icon"
                                        style={{ color: "#333" }}
                                        className="fa fa-fw fa-send"
                                        onClick={sendButton}
                                    ></i>
                                </div>
                            </div>

                            <div id="chat-bar-bottom">
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatbot