#! /usr/bin/env node

const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");

const downloadGit = (projectName) => {
  const spinner = ora("正在初始化").start();
  download(
    "gitlab:git.doctorwork.com:fuzhongyi/react-antd-template",
    projectName,
    function (err) {
      spinner.stop();
      if (!err) {
        console.info(chalk.greenBright("创建成功"));
      } else {
        console.info(chalk.redBright("创建失败：" + err));
      }
    }
  );
};
program
  .command("init [name]")
  .description("初始化项目")
  .action((name) => {
    if (name) {
      downloadGit(name);
    } else {
      inquirer
        .prompt([
          {
            name: "isOk",
            message: "是否初始化项目到当前目录[yes/no]: ",
          },
        ])
        .then((answer) => {
          const isOk = answer.isOk.toLowerCase();
          if (["yes", "y"].includes(isOk)) {
            downloadGit("./");
          } else {
            console.info(chalk.blueBright("操作取消"));
          }
        });
    }
  });

program.parse(process.argv);
