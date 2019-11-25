
const Page = {
    loadNow: function () {
    },
    loadLater: function () {
        import(/* webpackChunkName: "js/lazy/[request]" */ `../lazy/${Page.name}.js`).then((module) => {
            module.default.setup();
        });
    },
    setup: function () {
        Page.loadNow();
        Page.loadLater();
    }
};


export default Page;