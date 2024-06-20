const { src, dest, parallel, series, watch } = require("gulp");
const fileinclude = require("gulp-file-include");
const del = require("del");
const sass = require("gulp-sass")(require("sass"));
const gcssmq = require("gulp-group-css-media-queries");
const includeFiles = require("gulp-include");
const browserSync = require("browser-sync").create();

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "./public/",
            serveStaticOptions: {
                extensions: ["html"],
            },
        },
        port: 8080,
        ui: { port: 8081 },
        open: true,
    });
}

function styles() {
    return src("./src/styles/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gcssmq())
        .pipe(dest("./public/css/"))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(["./src/js/**.js"])
        .pipe(
            includeFiles({
                includePaths: "./src/components/**/",
            })
        )
        .pipe(dest("./public/js/"))
        .pipe(browserSync.stream());
}
function vendorScripts() {
    return src("./src/vendor/**.js")
        .pipe(dest("./public/vendor/js/"))
        .pipe(browserSync.stream());
}
function vendorStyles() {
    return src("./src/vendor/**.css")
        .pipe(dest("./public/vendor/css/"))
        .pipe(browserSync.stream());
}

function pages() {
    return src("./src/pages/*.html")
        .pipe(
            includeFiles({
                includePaths: "./src/components/**/",
            })
        )
        .pipe(dest("./public/"))
        .pipe(browserSync.reload({ stream: true }));
}

function components() {
    return src(["./src/pages/*.html"])
        .pipe(fileinclude({ basepath: "./src/" }))
        .pipe(dest("./public/"))
        .pipe(browserSync.reload({ stream: true }));
}

function copyFonts() {
    return src("./src/fonts/**/*").pipe(dest("./public/fonts/"));
}

function copyImages() {
    return src("./src/images/**/*").pipe(dest("./public/images/"));
}

function docs() {
    return src("./src/docs/**/*").pipe(dest("./public/docs/"));
}

async function copyResources() {
    copyFonts();
    copyImages();
    docs();
}

async function clean() {
    return del.sync("./public/", { force: true });
}

function watch_dev() {
    watch(["./src/styles/*.css"], vendorStyles);
    watch(["./src/js/*.js", "./src/components/**/*.js"], scripts);
    watch(["./src/vendor/*.js", "./src/components/**/*.js"], vendorScripts);
    watch(
        [
            "./src/styles/*.scss",
            "./src/styles/**/*.scss",
            "./src/components/**/*.scss",
        ],
        styles
    ).on("change", browserSync.reload);
    watch(["./src/pages/*.html", "./src/components/**/*.html"], pages).on(
        "change",
        browserSync.reload
    );
    watch(
        [
            "./src/pages/*.html",
            "./src/components/**/*.html",
            "./src/layouts/*.html",
        ],
        components
    ).on("change", browserSync.reload);
    watch(["./src/images/*", "./src/images/**/*"], copyImages).on(
        "change",
        browserSync.reload
    );
    watch(["./src/docs/*", "./src/docs/**/*"], docs).on(
        "change",
        browserSync.reload
    );
}

exports.browsersync = browsersync;
exports.clean = clean;
exports.scripts = scripts;
exports.vendorScripts = vendorScripts;
exports.styles = styles;
exports.vendorStyles = vendorStyles;
exports.pages = pages;
exports.components = components;
exports.copyResources = copyResources;

exports.default = parallel(
    clean,
    styles,
    vendorStyles,
    scripts,
    vendorScripts,
    copyResources,
    // pages,
    components,
    browsersync,
    watch_dev
);

exports.build = series(
    clean,
    styles,
    vendorStyles,
    scripts,
    vendorScripts,
    copyResources,
    // pages,
    components
);
