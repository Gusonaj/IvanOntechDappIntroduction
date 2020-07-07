if(typeof web3 != 'undefined'){
  web3 = new Web3(web3.currentProvider);
  } else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
  }
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0x6246472393617CB1BD125bc9d5fF3BccEC64fA03", {from: accounts[0]});
      console.log(contractInstance);
    });
    $("#get_data_button").click(fetchAndDisplay);
    $("#add_data_button").click(inputData);

});

function inputData(){
  var name = $("#name_input").val();
  var age = $("#age_input").val();
  var height = $("#height_input").val();
  var config = {value: web3.utils.toWei("1", "ether")}

  contractInstance.methods.createPerson(name, age, height).send(config).on("transactionHash", function(hash){
      console.log(hash);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber);
    })
    .on('receipt', function(receipt){
      console.log(receipt);
    })
  }
function fetchAndDisplay(){
  contractInstance.methods.getPerson().call().then(function(res){
    $("#name_output").text(res["name"]);
    $("#age_output").text(res["age"]);
    $("#height_output").text(res["height"]);
  });
}
