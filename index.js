let callAnotherNodeApp = require('child_process').fork;
let shellCommand = require('child_process').exec;

shellCommand("git status", function(error, stdout, stderr){
    if (!error && !stderr){
        console.log(stdout);
    } else if(error){
        console.log(error);
    }
})

//callAnotherNodeApp("./imu.js");