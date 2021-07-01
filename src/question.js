const inquirer = require('inquirer');
const colors = require('ansi-colors');

module.exports = {
    async get_type() {
        try {
            const { result } = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Select type',
                    name: 'result',
                    default: 'component',
                    choices: [
                        {
                            name: `📦️ Component ${colors.dim('generate a new component')}`,
                            value: 'component',
                        },
                        {
                            name: `🎨 Theme ${colors.dim('scaffolds a new theme')}`,
                            value: 'theme',
                        },
                        {
                            name: `⚡️ Plugin ${colors.dim('scaffolds a new plugin')}`,
                            value: 'plugin',
                        },
                        {
                            name: `🚀 Project ${colors.dim('scaffolds a new project')}`,
                            value: 'project',
                        },
                    ],
                },
            ]);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    async get_dir(dir, type, flavour) {
        try {
            const { result } = await inquirer.prompt([
                {
                    type: 'input',
                    message: `Set ${type} location`,
                    name: 'result',
                    default: dir,
                },
            ]);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    async get_name(type) {
        const name = type == 'component' ? 'Component.svelte' : '';
        try {
            const { result } = await inquirer.prompt([
                {
                    type: 'input',
                    message: `Name your ${type}`,
                    name: 'result',
                    default: name,
                },
            ]);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
    async get_flavour(type) {
        if (type != 'component') {
            return [];
        }
        try {
            const { result } = await inquirer.prompt([
                {
                    type: 'list',
                    message: `Select ${type} flavour`,
                    name: 'result',
                    default: 'component',
                    choices: [
                        {
                            name: `📦️ Component ${colors.dim('generate a component')}`,
                            value: 'component',
                        },
                        {
                            name: `📄 Page ${colors.dim('generate a page component')}`,
                            value: 'page',
                        },
                        {
                            name: `🍱 Layout ${colors.dim('generate a layout component')}`,
                            value: 'layout',
                        },
                        {
                            name: `🔧 Document ${colors.dim('generate a doc component')}`,
                            value: 'doc',
                        },
                    ],
                },
            ]);
            return result;
        } catch (error) {
            console.log(error);
        }
        return [];
    },
    async get_features(type, flavour) {
        if (type != 'component' || flavour != 'component') {
            return [];
        }
        const predefined = ['hydrate', 'on_server'];
        const choices = [
            {
                name: `⚡️ onServer ${colors.dim('adds the onServer hook to the component')}`,
                value: 'on_server',
            },
            {
                name: `✨ Hydrate ${colors.dim('makes the component hydrateable')}`,
                value: 'hydrate',
            },
            {
                name: `🙈 Lazy Loading ${colors.dim('makes the component lazy loaded, when in view')}`,
                value: 'lazy',
            },
            {
                name: `🚚 Portal ${colors.dim('allows the component to be portaled to another node')}`,
                value: 'portal',
            },
        ];

        try {
            const { result } = await inquirer.prompt([
                {
                    type: 'checkbox',
                    message: `Select ${type} features`,
                    name: 'result',
                    default: predefined,
                    choices,
                },
            ]);
            // when lazy or portal, hydrate is required
            if (result.indexOf('hydrate') == -1 && (result.indexOf('lazy') > -1 || result.indexOf('portal') > -1)) {
                return ['hydrate', ...result];
            }
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    },
};
