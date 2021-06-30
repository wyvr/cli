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
                    default: 'project',
                    choices: [
                        {
                            name: '🚀 Project',
                            value: 'project',
                        },
                        {
                            name: '🎨 Theme',
                            value: 'theme',
                        },
                        {
                            name: '⚡️ Plugin',
                            value: 'plugin',
                        },
                        {
                            name: '📦️ Component',
                            value: 'component',
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
    async get_dir(dir, type) {
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
                            name: '📦️ Component',
                            value: 'component',
                        },
                        {
                            name: '📄 Page',
                            value: 'page',
                        },
                        {
                            name: '🍱 Layout',
                            value: 'layout',
                        },
                        {
                            name: '🔧 Document',
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
        const predefined = ['hydrate'];
        const choices = [
            {
                name: '✨ Hydrate',
                value: 'hydrate',
            },
            {
                name: '🙈 Lazy Loading',
                value: 'lazy',
            },
            {
                name: '🚚 Portal',
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
            // when lazy or portal hydrate is required
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
