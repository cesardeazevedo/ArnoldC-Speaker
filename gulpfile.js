
var gulp     = require('gulp'),
    concat   = require('gulp-concat'),
    uglify   = require('gulp-uglify'),
    jshint   = require('gulp-jshint'),
    filter   = require('gulp-filter'),
    jade     = require('gulp-jade'),
    imgmin   = require('gulp-imagemin'),
    bower    = require('main-bower-files'),
    stylus   = require('gulp-stylus'),
    connect  = require('gulp-connect'),
    nib      = require('nib'),
    fallback = require('connect-history-api-fallback');

var paths = {
    destjs:     'app/dist/src',
    destcss:    'app/dist/css',
    destaudio:  'app/dist/audio',
    destimages: 'app/dist/images',
    dest:   'app/dist',
    js:     'app/src/**/*.js',
    styl:   'app/styles/*.styl',
    audio:  'app/audio/*.mp3',
    images: 'app/images/*.png',
    jade:  'app/*.jade'
}

gulp.task('scripts', function(){
    return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(concat('build.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.destjs))
    .pipe(connect.reload());
});

gulp.task('arnoldc', function(){
    return gulp.src("app/src/arnoldc/*.arnoldc")
    .pipe(gulp.dest("app/dist/src/arnoldc"));
});

gulp.task('styles', function(){
    return gulp.src(paths.styl)
    .pipe(concat('styles.styl'))
    .pipe(stylus({
        use: nib(),
        compress: true
    }))
    .pipe(gulp.dest(paths.destcss))
    .pipe(connect.reload());
});

gulp.task('views', function(){
    return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest(paths.dest))
    .pipe(connect.reload());
});

gulp.task('images', function(){
    return gulp.src(paths.images)
    .pipe(imgmin({
            optimizationLeval: 3,
            progressive: true
    }))
    .pipe(gulp.dest(paths.destimages));
});

gulp.task('audios', function(){
    return gulp.src(paths.audio)
    .pipe(gulp.dest(paths.destaudio));
});

gulp.task('bower', function(){

    var jsFilter   = filter('**/*.js');
    var cssFilter  = filter('**/*.css');
    var fontFilter = filter('**/*.+(svg|ttf|woff)');

    return gulp.src(bower(),{
        base: 'bower_components'
    })
    .pipe(jsFilter)
    .pipe(concat('bower.all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.destjs))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(concat('bower.all.css'))
    .pipe(gulp.dest(paths.destcss))
    .pipe(cssFilter.restore())
    .pipe(fontFilter)
    .pipe(gulp.dest(paths.dest+"/fonts/"));

});

gulp.task('server', ['default', 'watch'],function(){
    connect.server({
        port: 9090,
        root: 'app/dist',
        livereload: true,
        middleware: function(){
            return [fallback];
        }
    });
});

gulp.task('watch', function() {
    gulp.watch([paths.styl, paths.js, paths.jade, paths.images], ['styles', 'views', 'scripts' ]);
});

gulp.task('default', ['scripts', 'styles', 'views', 'images']);

gulp.task('build', ['bower','audios','arnoldc','default']);
