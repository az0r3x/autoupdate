let print = require('@az0r3x/print');
let callAnotherNodeApp = require('child_process').fork;
let shellCommand = require('child_process').exec;
let shellCommandSync = require('child_process').execSync;

shellCommandSync("git fetch");
shellCommand("git status", function (error, stdout, stderr) {
    if (error) {
        print(error);
    }
    if (stderr) {
        print(stderr);
    }
    if (!error && !stderr) {
        if (stdout) {
            if (stdout.includes("Your branch is up to date")) {
                print("Update available. Downloading...");
                updateApp();
            } else {
                print("Already up-to-date");
                callAnotherNodeApp("./imu.js");
                console.log("nova atualizacao");
            }
        }
    }
});

function updateApp() {
    shellCommand("git pull -f origin master", function (error, stdout, stderr) {
        if (error) {
            print(error);
        }
        if (stderr) {
            print(stderr);
        }
        if (!error && !stderr) {
            if (stdout) {
                print(stdout);
            }
        }
    })
}