
function openit()
{
    var sender = document.getElementById('Username').value;
    var reciever = document.getElementById('req').value;
    //alert("Request sent from " + sender + " to: " + reciever);
    module.exports = { sender, reciever };
    // console.log(sender, reciever);
}