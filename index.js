let callAnotherNodeApp = require('child_process').fork;
let shellCommand = require('child_process').exec;

shellCommand("git status", function(error, stdout, stderr){
    if (!error && !stderr){
        if (stdout) {
            if (stdout.includes("Your branch is up to date")){
                console.log("Update available");
            } else {
                console.log("Already up-to-date")
            }
        }
    } else if(error){
        console.log(error);
    }
})

//callAnotherNodeApp("./imu.js");