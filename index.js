#!/usr/bin/env node
var download = require("download-git-repo");
var program = require("commander");
var chalk = require("chalk");
var version = require("./package.json").version;
var username = require("./config.json").username;

function downRepo(repo, options) {
  var _repo;
  var branch;
  var dest;
  if (repo.split("/") > 2) {
    _repo = repo;
  } else {
    _repo = `${username}/${repo}`;
  }
  if (program.branch) {
    _repo = _repo + `#${program.branch}`;
  }
  dest = program.output || "./";

  download(_repo, dest, function(err) {
    console.log(err ? err.statusMessage : chalk.green("Success!"));
  });
}

program
  .version(version)
  .option("-r, --repo <repository>", "select which repo to use")
  .option("-s, --set <username>", "set default username ")
  .option("-b, --branch <branch>", "select which branch")
  .option("-o, --output <output>", "output path")
  .option("-l --loglevel [debug|info|warn|error]");

program
  .command("*")
  .description("download a repo with 'biu'")
  .action(function(repo, options) {
    downRepo(repo, options);

    console.log("username", username);
    console.log('deploying "%s"', repo);
  });

program.parse(process.argv);
