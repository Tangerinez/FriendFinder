var friends = require("../data/friends");

// We export the entire function to our server file so we can use the functionality
module.exports = function(app) {
  app.get("api/friends", function(req, res) {
    res.json(friends);
  });

  // We create an object to hold our user data
  app.post("/api/friends", function(req, res) {
    var userInput = req.body;
    var userScores = userInput.data;
    var bestFriend = {
      name: "",
      photo: "",
      friendScore: Infinity
    };

    console.log({ userInput });

    for (let i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      var totalDifference = 0;
      console.log(currentFriend.name);
      for (let j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentFriendScore)
        );
      }
      console.log(totalDifference);
      if (totalDifference < bestFriend.friendScore) {
        bestFriend.friendScore = totalDifference;
        bestFriend.name = currentFriend.name;
        bestFriend.photo = currentFriend.photo;
      }
    }

    console.log({ bestFriend });

    friends.push(userInput);
    res.json(bestFriend);
  });
};
