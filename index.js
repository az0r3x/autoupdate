let print = require('@az0r3x/print');
let callAnotherNodeApp = require('child_process').fork;
let shellCommand = require('child_process').exec;
let shellCommandSync = require('child_process').execSync;

//#region Main Routine
if (thereIsInternetConnection()) {
    lookForUpdates();
} else {
    print("Couldn't reach the internet");
    callAnotherNodeApp("./myCode.js");
}
//#endregion Main Routine

//#region Utils
function thereIsInternetConnection() {
    try {
        shellCommandSync('ping -n 1 8.8.8.8');
        return true;
    } catch (error) {
        return false;
    }
}

function lookForUpdates() {
    shellCommandSync("git fetch");
    shellCommand("git status", function (error, stdout, stderr) {
        if (stderr) {
            print(stderr);
        }
        if (!error && !stderr) {
            if (stdout) {
                if (stdout.includes("Your branch is behind")) {
                    print("Update available. Downloading...");
                    updateApp();
                } else {
                    print("Already up-to-date");
                    callAnotherNodeApp("./imu.js");
                }
            }
        }
    });
}

function updateApp() {
    shellCommandSync("git reset --hard HEAD")
    shellCommand("git pull", function (error, stdout, stderr) {
        if (stderr) {
            print(stderr);
        }
        if (!error && !stderr) {
            if (stdout) {
                print(stdout);
            }
        }
        callAnotherNodeApp("./imu.js");
    })
}
//#endregion Utils