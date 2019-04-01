const gulp =        require('gulp');
const watch =       require('gulp-watch');
const batch =       require('gulp-batch');
const rename =      require('gulp-rename');
const concat =      require('gulp-concat');
const uglify =      require('gulp-uglify');
const pug =         require('gulp-pug');
const sass =        require('gulp-sass');
const sourcemaps =  require('gulp-sourcemaps');
const markdown =    require('gulp-markdown');
const util =        require('gulp-util');
const data =        require('gulp-data');
const fs =          require('fs');

gulp.task('markup', function(){
    gulp.src('views/**/*.pug')
        // .pipe(watch('views/**/*.pug'))
        .pipe(data(function(file){
            return JSON.parse(fs.readFileSync('assets/data/pug-data.json'))
        }))
        .pipe(pug({pretty: '\t'}).on('error', handleError))
        .pipe(gulp.dest('../dist/pages'));
});

gulp.task('vendor-script', function(){
    //concact and minify all libraries to vendor.min.js
    return gulp.src([
                'assets/js/lib/jquery/jquery.min.js',
                'assets/js/lib/swiper/swiper.js',
                'assets/js/lib/jquery_validate/jquery.validate.js',
                // 'assets/js/lib/chosen/chosen.jquery.js',
                'assets/js/lib/flatpickr/flatpickr.js',
                'assets/js/lib/multiselect/jquery.multiselect.js',
                'assets/js/lib/fancybox/fancybox.js',
                'assets/js/lib/wow/wow.js'
            ])
        .pipe(concat('vendor.min.js', {newLine: '\n;'}))
        .pipe(uglify())
        .pipe(gulp.dest('../dist/assets/js/'));
});

gulp.task('app-script', function(){
    //concat all app scripts to bundle.js
    gulp.src([
                'assets/js/polyfills/**/*.js',
                'assets/js/app/common.js',
                'assets/js/components/**/*.js',
                'assets/js/modules/**/*.js',
                'assets/js/app/app.js'
            ])
        .pipe(concat('bundle.js', {newLine: '\n;'}))
        .pipe(gulp.dest('../dist/assets/js'));
});

gulp.task('app-script-min', function(){
    //concat all app scripts and minifiy it to bundle.min.js
    gulp.src([
                'assets/js/polyfills/**/*.js',
                'assets/js/app/common.js',
                'assets/js/components/**/*.js',
                'assets/js/modules/**/*.js',
                'assets/js/app/app.js'
            ])
        .pipe(concat('bundle.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('../dist/assets/js'));
    
    gulp.src('assets/js/modules/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../dist/assets/js/partials/'));
});

gulp.task('style', function(){
    return gulp.src('assets/scss/app/*.scss')
        // .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded', indentType: 'tab', indentWidth: 1}).on('error', sass.logError))
        // .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('../dist/assets/css'));
});

 gulp.task('style-min', function(){
    return gulp.src('assets/scss/app/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename(function(file){
                file.extname = ".min.css";
            }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('../dist/assets/css'));
});

gulp.task('markdown', function(){
    return gulp.src([
                '../../../README.md',
                '../../../change-log.md'
            ])
        .pipe(markdown())
        .pipe(gulp.dest('md-to-html'))
});

gulp.task('watch', function(){
    //markup
    watch([
            'views/**/*.pug',
            'view-modules/**/*.pug',
            'assets/data/pug-data.json'], batch(function(events, done){
        gulp.start(['markup'], done);
    }));

    //app-scripts
    watch([
            'assets/js/polyfills/**/*.js',
            'assets/js/app/common.js',
            'assets/js/components/**/*.js',
            'assets/js/modules/**/*.js',
            'assets/js/app/app.js'
            ], batch(function(events, done){
        gulp.start('app-script', done);
    }));

    //scss
    watch('assets/scss/**/*.scss', batch(function(events, done){
        gulp.start(['style'], done);
    }));
    
    //markdowns
    watch([
            '../../../README.md',
            '../../../change-log.md'
        ], batch(function(events, done){
        gulp.start('markdown', done);
    }));

    util.log('Watching for Pug, Sass, JS and Markdown changes. Press Ctrl-C to Stop.');
});

gulp.task('build', ['markup', 'vendor-script', 'app-script', 'style']);
gulp.task('build-min', ['markup', 'vendor-script', 'app-script', 'app-script-min', 'style', 'style-min']);
gulp.task('default', ['build']);

function handleError(err){
    util.log('Error');
    util.log(err);
    this.emit('end');
}