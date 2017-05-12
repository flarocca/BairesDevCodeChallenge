
1- How to run test

  a. Ensure you have installed NodeJS, visit the official site (https://nodejs.org/en/download/) to get instruccions
     about how to install it.
  b. Clone this repo
  c. Navigate to project's folder and run "npm install"
  d. Run "npm test"


2- How to generate the files

  a. V1: run "npm run start:v1"
  b. V2: run "npm run start:v2"

  The files will be generated in the root folder as people_v1.out and people_v2.out respectively.


3- Analysis

  a. The statement is clear about what is needed. However, it is not clear about how to extract the information in
     people.in file. It mentions "probability", but says nothing about how to calculate it.
  b. We know that a probability function must return a value less or equal to one and greater or equal to zero.


4- Questions

  The question I found are related to probability and how to calculate it.
  
  a. Do two clients have the same probability if they industries are different?
  b. What is more important? NumberOfRecommendations over NumberOfConnections or vice versa?
  c. Does the role impact in how a probability is calculated?
  d. What happend if two clients have the same probability? One of them in the position 100, the other one in the
     position 101, which one should be priority?
  

5- Aproaches

  a. Since It is not clear how to calculate "The probability", I decided to design a model which allows us to delegate
     how to calculate the probability.
  b. Despite the statement asks to extract first 100 (sorted from more probables to less probable), I decided to
     parametrize the number of rows we want to extract.
  c. I created a test-suite in order to ensure consistency.
  d. I also included the ability to filter clients, for example, in the case the probability could not be calculated due
     some information missing.


6- Implementations

  a. The first implementation (v1), focuses on performance loading the whole file in memory at once and performing
     all the operations on the fly. In others words, It reads the whole file, transforms the data and returns a new file.
    Advantages:
      - The file is not locked during the transformation
      - Working in memory is faster
      - The data can be used as a block allowing ordering and insertions more easily
    Disadvantages:
      - Bigger files might cause a stack overflow
      - Memory consumption

  b. The second implementation (v2), memory optimization processing line by line. I reads line by line, analizes each row
     and insert the result only if it must be inserted.
    Advantages:
      - It avoids stack overflow exceptions due to we know before start how many records we are going to store in memory
      - Memory concuption is optimized
    Disadvantages:
      - The file is locked during the transformation
      - Processing algorithms are more complicated


7- Comments:

  a. In both versions, I've used, such as an example, the same probability function. Even when that function does not
     satisfy exactly the expected one, the changes needed to make it work are minimum and limited just to the mentioned function.

  b. Some differences might be found comparing the two files. Due to the probability function created by me is not
     accurated enought to produce accurated results, if two clients had the same probability they would be ordered
     randomly.

  c. In the first version (v1) my approach was to finish the exercise in the time proposed (3-4 hours). In the second my
     approach was just to find a better (more optimum) way to implement it.

    