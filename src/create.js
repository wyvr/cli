const { copySync, mkdirSync, readdirSync, existsSync, writeFileSync, readFileSync } = require('fs-extra');
const { join } = require('path');

const create = {
    start(type, dir, file_name, flavour, features) {
        switch (type) {
            case 'project':
                create.create_project(dir, file_name, flavour, features);
                break;
            case 'theme':
                create.create_theme(dir, file_name, flavour, features);
                break;
            case 'plugin':
                create.create_plugin(dir, file_name, flavour, features);
                break;
            case 'component':
                create.create_component(dir, file_name, flavour, features);
                break;
        }
    },
    create_project(dir, file_name, flavour, features) {
        const target = join(dir, file_name);
        const resource = join(__dirname, '../resources/project');
        create.copy_resource(resource, target);
        create.copy_wyvr_file(dir, file_name);
    },
    create_theme(dir, file_name, flavour, features) {
        const target = join(dir, file_name);
        const resource = join(__dirname, '../resources/theme');
        create.copy_resource(resource, target);
        create.copy_wyvr_file(dir, file_name);
    },
    create_plugin(dir, file_name, flavour, features) {
        const target = join(dir, file_name);
        const resource = join(__dirname, '../resources/plugin');
        create.copy_resource(resource, target);
        // @TODO rename vendor and name folders
        create.copy_wyvr_file(dir, file_name);
    },
    create_component(dir, file_name, flavour, features) {
        const target = join(dir);
        const resource = join(__dirname, '../resources/component');
        if (!existsSync(target)) {
            mkdirSync(target, { recursive: true });
        }
        const content = [];
        switch (flavour) {
            case 'doc':
                content.push(readFileSync(join(resource, 'doc.svelte'), { encoding: 'utf-8' }));
                break;
            case 'layout':
                content.push(readFileSync(join(resource, 'layout.svelte'), { encoding: 'utf-8' }));
                break;
            case 'page':
                content.push(readFileSync(join(resource, 'page.svelte'), { encoding: 'utf-8' }));
                break;
            case 'component':
                content.push('<script>');
                content.push('    wyvr: {');
                content.push(`        display: 'block';`);
                content.push(`        render: '${features.indexOf('hydrate') > -1 ? 'hydrate' : 'static'}';`);
                content.push(`        loading: '${features.indexOf('lazy') > -1 ? 'lazy' : 'instant'}';`);
                if (features.indexOf('portal') > -1) {
                    content.push(`        portal: '<insert portal target css selector>';`);
                }
                content.push('    }');
                content.push('');
                if (features.indexOf('on_server') > -1) {
                    content.push('    // Static entrypoint');
                    content.push('    onServer(() => {');
                    content.push(`        name = 'server';`);
                    content.push('    })');
                }
                content.push('');
                if (features.indexOf('hydrate') > -1) {
                    content.push('    // Client hydration');
                    if (features.indexOf('on_server') > -1) {
                        content.push('    let on_server = true;');
                    }
                    content.push(`    import { onMount } from 'svelte';`);
                    content.push(`    onMount(() => {`);
                    if (features.indexOf('on_server') > -1) {
                        content.push('        on_server = false;');
                    }
                    content.push(`        name = 'client';`);
                    content.push('    })');
                    content.push('');
                    content.push('    // Click event on client');
                    content.push('    let counter = 1;');
                    content.push('    // "Computed Property"');
                    content.push('    $: sum = counter * 10;');
                    content.push('    function click() {');
                    content.push('        counter++;');
                    content.push('    }');
                    content.push('');
                }
                content.push('    // Property which can be set from parent component');
                content.push(`    export let name = 'initial';`);
                content.push('');
                content.push('</script>');
                content.push('');
                if (features.indexOf('on_server') > -1) {
                    content.push('<div class:static={on_server}>');
                } else {
                    content.push('<div>');
                }
                content.push('    hello {name}');
                if (features.indexOf('hydrate') > -1) {
                    content.push('    <button on:click={click}>{counter}</button>');
                    content.push('    <span>10 x {counter} = {sum}</span>');
                }
                content.push('</div>');
                content.push('');
                content.push('<style>');
                content.push('    /* Place your scoped styles here */');
                if (features.indexOf('on_server') > -1) {
                    content.push('    .static { opacity: 0.9; }');
                }
                content.push('</style>');
                break;
            default:
                return false;
        }
        writeFileSync(join(target, file_name), content.join('\n'));
        return true;
    },
    copy_resource(resource, target) {
        if (!existsSync(target)) {
            mkdirSync(target, { recursive: true });
        }
        const files = readdirSync(resource);
        files.forEach((file) => {
            copySync(join(resource, file), join(target, file));
        });
    },
};
module.exports = create;
