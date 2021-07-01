const { readdirSync, existsSync } = require('fs');
const { join, extname, basename } = require('path');
const helper = {
    correct_dir(type, flavour) {
        const cwd = process.cwd();
        let required_parts = [];
        if (['doc', 'page', 'layout', 'component'].indexOf(type) > -1) {
            required_parts.push(join('src'));
        }
        if (['doc'].indexOf(type) > -1) {
            required_parts.push(join('src', 'doc'));
        }
        if (['layout'].indexOf(type) > -1) {
            required_parts.push(join('src', 'layout'));
        }
        if (['page'].indexOf(type) > -1) {
            required_parts.push(join('src', 'page'));
        }
        const found_parts = [];
        const missing_parts = [];
        required_parts.forEach((part) => {
            if (cwd.indexOf(part) > -1) {
                found_parts.push(part);
                return;
            }
            missing_parts.push(part);
        });
        if (found_parts.length == required_parts.length) {
            return cwd;
        }
        if (missing_parts.length > 0) {
            const corrected_dir = missing_parts.filter((part) => existsSync(join(cwd, part)));
            if (corrected_dir.length > 0) {
                return corrected_dir
                    .reverse()
                    .map((part) => join(cwd, part))
                    .find((x) => x);
            }
        }

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
