/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': 'node_modules/@angular',
        'rxjs': 'node_modules/rxjs',
        'mydatepicker': 'node_modules/mydatepicker/bundles/mydatepicker.umd.min.js',
        'ng2-progressbar': 'node_modules/ng2-progressbar/bundles/ng2-progressbar.umd.js',
        'ng2-datetime-picker': 'node_modules/ng2-datetime-picker/dist',
        'ng-gallery': 'node_modules/ng-gallery/bundles/ng-gallery.umd.js',
        'devextreme': 'node_modules/devextreme',                   // <== add this line
        'jquery': 'node_modules/jquery/dist/jquery.min.js',        // <== add this line
        'jszip': 'node_modules/jszip/dist/jszip.min.js',           // <== add this line
        'devextreme-angular': 'node_modules/devextreme-angular',   // <== add this line
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'ng2-datetime-picker': { main: 'ng2-datetime-picker.umd.js', defaultExtension: 'js' },
        'devextreme-angular': { main: 'index.js', defaultExtension: 'js' }, // <== add this line
        'devextreme': { defaultExtension: 'js' }                    // <== add this line
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router'
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);