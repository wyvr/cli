module.exports = {
    url: 'wyvr-project',
    worker: {
        ratio: 0,
    },
    packages: [
        {
            name: 'Local',
            path: 'local-package',
        }
    ],
    default_values: {
        title: 'wyvr',
        meta_description: 'Static sites made different',
        date: new Date()
    }
};
