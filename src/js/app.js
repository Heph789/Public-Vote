if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

var publicVote = web3.eth.contract([
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes30"
      }
    ],
    "name": "votes",
    "outputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "numItems",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "bytes30"
      },
      {
        "name": "numItems",
        "type": "uint8"
      }
    ],
    "name": "establishVote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "nameOfVote",
        "type": "bytes30"
      },
      {
        "name": "item",
        "type": "bytes15"
      },
      {
        "name": "index",
        "type": "uint8"
      }
    ],
    "name": "addItem",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "bytes30"
      },
      {
        "name": "candidateIndex",
        "type": "uint8"
      }
    ],
    "name": "voteFor",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "nameOfVote",
        "type": "bytes30"
      },
      {
        "name": "index",
        "type": "uint8"
      }
    ],
    "name": "getCandidates",
    "outputs": [
      {
        "name": "",
        "type": "bytes15"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "nameOfVote",
        "type": "bytes30"
      },
      {
        "name": "index",
        "type": "uint8"
      }
    ],
    "name": "getAmounts",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]);

var publicVoteInstance = publicVote.at("0x7095539b4581a5d2b87aa0617597d8f226bad384");



$(document).ready(() => {

  //Click on the create vote button, reveals the form
  $('#cVText').click(() => {
      $('#cVText').addClass("hide");
      $('#cVForm').removeClass("hide");
      //$('#createVote').css("background-color", "");
  });

  /*//hovering changes background color
  $('#cVText').hover(() => {
    //if the form is active hovering no longer changes background color
      //darker reddish color
      $('#cVText').animate({backgroundColor: "#dc2729"}, 300);
  },
  () => {
    $('#cVText').css("background-color", "");
  });*/

  //Clicking on the create button submits the form
  $('#create').click(() => {
    let name = $('#cVForm input[name=Name]').val();
    let numOfCans = parseInt($('#cVForm input[name=numOfCans]').val());

    //Turn into function ----------------------------------------------------
    let err;
    if (name.length >= 30) { err = "Length of name is too large"; }
    if (name == "") { err = "No name given"; }
    if (typeof(numOfCans) != 'number' || !numOfCans) { err = "Not a number"; }
    console.log(numOfCans, err);
    //-----------------------------------------------------------------------

    if (err) {
      //change the way this is handled later
      alert(err);
    }
    else {
      publicVoteInstance.establishVote(name, numOfCans, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("established vote");
          addVote(name);
          resetCVButt();
        }
      });
    }
  });

  //Clicking on the cancel button brings back the create button and hides the form
  $('#cancel').click(() => {
    console.log("cancel");
    resetCVButt();
  });

  $('#Votes').on("click", ".ballot", function() {
      $('.ballot').css("background-color", "");
      selectVote(this);
  });

  //resets CreateVote button
  function resetCVButt() {
    console.log("reset");
    $('#cVText').removeClass("hide");
    $('#cVForm').addClass("hide");
    $('#cVText').css("background-color", "");
  }

  //Add Vote
  function addVote(name) {
    console.log("added vote");
    var html = '<div class="ballot button sidePart">' + name + '</div>';
    $('#Votes').append(html);
  }

  function selectVote(selectedItem) {
    console.log("happened");
    $(selectedItem).css("background-color", "#3e516b");
  }
});
