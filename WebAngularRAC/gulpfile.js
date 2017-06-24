var gulp = require('gulp');

gulp.task('thirdparty', function () {
    gulp.src('./node_modules/core-js/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/core-js'));
    gulp.src('./node_modules/@angular/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/@angular'));
    gulp.src('./node_modules/zone.js/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/zone.js'));
    gulp.src('./node_modules/systemjs/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/systemjs'));
    gulp.src('./node_modules/reflect-metadata/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/reflect-metadata'));
    gulp.src('./node_modules/rxjs/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/rxjs'));
    gulp.src('./node_modules/mydatepicker/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/mydatepicker'));
    gulp.src('./node_modules/ng2-progressbar/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/ng2-progressbar'));
    gulp.src('./node_modules/datetime-picker/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/datetime-picker'));
    gulp.src('./node_modules/ng2-datetime-picker/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/ng2-datetime-picker'));
    gulp.src('./node_modules/ng-gallery/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/ng-gallery'));
    gulp.src('./node_modules/devextreme/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/devextreme'));
    gulp.src('./node_modules/devextreme-angular/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/devextreme-angular'));
    gulp.src('./node_modules/devextreme/**/*.css')
        .pipe(gulp.dest('./wwwroot/node_modules/devextreme'));
    gulp.src('./node_modules/devextreme-angular/**/*.css')
        .pipe(gulp.dest('./wwwroot/node_modules/devextreme-angular'));
    gulp.src('./node_modules/jszip/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/jszip'));
    gulp.src('./node_modules/jquery/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/jquery'));
   
});
            
gulp.task('copy', function () {
    gulp.src('./app/**/*.*')
        .pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('watch', function () {
    gulp.watch('./app/**/*.*', ['copy']);
});
