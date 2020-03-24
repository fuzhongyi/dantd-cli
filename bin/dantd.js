#! /usr/bin/env node

const program = require("commander");
const download = require("download-git-repo");
const chalk = require("chalk");
const ora = require("ora");

program
  .command("init [name]")
  .description("初始化项目")
  .action(name => {
    const spinner = ora("正在下载").start();
    download(
      "gitlab:git.doctorwork.com:fuzhongyi/react-antd-template",
      name,
      function(err) {
        spinner.stop();
        if (!err) {
          console.info(chalk.greenBright("下载成功"));
        } else {
          console.info(chalk.redBright("下载失败：" + err));
        }
      }
    );
  });

program.parse(process.argv);
