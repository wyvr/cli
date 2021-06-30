const { readdirSync, existsSync } = require('fs');
const { join, extname, basename } = require('path');
const helper = {

    find_cwd(type) {
        const cwd = process.cwd();
        // if (['project', 'theme', 'plugin'].indexOf(type) > -1) {
        //     return cwd;
        // }
        // if (type == 'component') {
        //     let dir = cwd;
        //     while (!helper.contains_folder_wyvr_file(dir) && dir != '/') {
        //         dir = join(dir, '..');
        //     }
        //     if (dir == '/') {
        //         return cwd;
        //     }
        //     return dir;
        // }
        return cwd;
    },
    contains_folder_wyvr_file(dir) {
        if (existsSync(dir)) {
            const files = readdirSync(dir);
            return files.find((file) => file == 'wyvr.js') != null;
        }
        return false;
    },
    convert_name_to_file_name(name, type) {
        if (type == 'component') {
            const ext = extname(name);
            if (!ext) {
                return `${name}.svelte`;
            } else if (ext != '.svelte') {
                return `${basename(name)}.svelte`;
            }
        }
        return name;
    },
};
module.exports = helper;
