#!/usr/bin/env node
const { Command } = require('commander');
const { readFileSync } = require('fs');
const { join } = require('path');
const colors = require('ansi-colors');
const program = new Command();

const { get_type, get_dir, get_name, get_flavour, get_features } = require('./src/question');
const { correct_dir, convert_name_to_file_name } = require('./src/helper');
const { start } = require('./src/create');

const pkg_content = readFileSync(join(__dirname, 'package.json'), { encoding: 'utf-8' });
let pkg = null;
let version = '_._._';
if (pkg_content) {
    try {
        pkg = JSON.parse(pkg_content);
        version = pkg.version;
    } catch (e) {}
}
program.version(version);

program
    .option('-i, --init', 'initialize a new wyvr project')
    .option('-t, --theme', 'create theme folder structure')
    .option('-p, --plugin', 'create plugin folder structure')
    .option('-c, --component', 'create wyvr/svelte component');

program.action(async () => {
    const logo = [`__  __  __  __  __  ____`, `\\ \\/ /\\/ /\\/ /\\/ /\\/ /_/`, ` \\/_/\\/_/\\/ /\\/_/\\/_/`, `         /_/ cli ${colors.dim(version)}`].join(
        '\n'
    );
    console.log(colors.cyan(logo));
    console.log('');
    // init value
    const options = program.opts();
    let type = null;
    switch (true) {
        case options.init:
            type = 'project';
            break;
        case options.theme:
            type = 'theme';
            break;
        case options.plugin:
            type = 'plugin';
            break;
        case options.component:
            type = 'component';
            break;
    }
    // type is required
    if (type) {
        console.log(colors.green('?'), colors.bold('Create'), colors.cyan(type));
    }
    while (!type) {
        type = await get_type();
    }
    // select the features for the type
    const flavour = await get_flavour(type);
    // select the features for the type
    const features = await get_features(type, flavour);
    // get the name
    const name = await get_name(type);
    const file_name = convert_name_to_file_name(name, type);
    // get cwd
    const cwd = await correct_dir(type, flavour);
    const dir = await get_dir(cwd, type, flavour);
    start(type, dir, file_name, flavour, features);
    console.log(colors.green(`✓ created ${type}`));
});

program.parse();
