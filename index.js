let print = require('@az0r3x/print');
let callAnotherNodeApp = require('child_process').fork;
let shellCommand = require('child_process').exec;
let shellCommandSync = require('child_process').execSync;

//#region Main Routine
if (thereIsInternetConnection()) {
    lookForUpdates();
} else {
    callAnotherNodeApp("./imu.js");
}
//#endregion Main Routine

//#region Utils
function thereIsInternetConnection() {
    shellCommandSync('ping 8.8.8.8', function (error) {
        if (error !== null)
            return false;
        else
            return true;
    });
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
    })
}
//#endregion Utils