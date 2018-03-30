// Require all modules
const   gulp        = require('gulp'),
        sass        = require('gulp-sass'),
        csso        = require('gulp-csso'),
        browserSync = require('browser-sync').create(),
        uglify      = require('gulp-uglify'),
        pump        = require('pump'),
        babel       = require('gulp-babel'),
        concat      = require('gulp-concat'),
        htmlMin     = require('gulp-html-minifier'),
        cleaner     = require('gulp-clean'),
        imagemin    = require('gulp-imagemin'),
        autoprefixer = require('gulp-autoprefixer'),
        rename      = require('gulp-rename'),
        {phpMinify} = require('@cedx/gulp-php-minify');

// Task to create local server
gulp.task('server', ['sass', 'compress-js', 'compress-js-libs', 'compress-css-libs', 'combine-css'], () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });

    // Watch all files on changes
    gulp.watch('app/js/**/main.js', ['compress-js']);
    gulp.watch('app/scss/**/*.scss', ['sass', 'combine-css']);
    gulp.watch(['app/*.html', 'app/*.php']).on('change', browserSync.reload);
});

gulp.task('minify-php', () => {
  return gulp.src('app/*.php', {read: false})
    .pipe(phpMinify())
    .pipe(gulp.dest('app'));
});

// Task to compile SCSS files to CSS
gulp.task('sass', () => {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({
			includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(csso())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

// Task to concat all CSS libs in one file
gulp.task('compress-css-libs', () => {
    return gulp.src([
            'app/lib/font-awesome/fontawesome-all.min.css',
            'app/lib/pe-7-stroke/pe-icon-7-stroke.min.css',
            'app/lib/lightgallery.js/dist/css/lightgallery.min.css',
            'app/lib/animate.css/animate.min.css'
        ])
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('app/css'));
});

// Task to concat all JS libs in on file
gulp.task('compress-js-libs', (cb) => {
    pump([
            gulp.src([
                'app/lib/jquery/dist/jquery.min.js',
                'app/lib/lightgallery.js/dist/js/lightgallery.min.js',
                'app/lib/wow/dist/wow.min.js'
            ]),
            concat('libs.min.js'),
            gulp.dest('app/js')
        ],
        cb);
});

gulp.task('combine-css', (cb) => {
    pump([
            gulp.src([
                'app/css/libs.min.css',
                'app/css/default.min.css',
                'app/css/main.min.css'
            ]),
            concat('style.css'),
            gulp.dest('app/css')
        ],
        cb);
});


// Task to minify all common JS files
gulp.task('compress-js', (cb) => {
    pump([
            gulp.src('app/js/**/main.js'),
            rename({suffix: '.min', prefix: ''}),
            babel({
                presets: ['env']
            }),
            uglify(),
            gulp.dest('app/js'),
            browserSync.stream()
        ],
        cb
    );
});

// Default task to start server
gulp.task('default', ['server']);


/* Tasks for dist files */
/* ========================= */
gulp.task('dist-css', () => {
    return gulp.src([
      'app/css/fonts-in.min.css',
      'app/css/fonts-ex.min.css',
      'app/css/style.css'
    ])
      .pipe(gulp.dest('dist/css'));
});

gulp.task('dist-html', () => {
    return gulp.src(['app/*.html', 'app/*.php'])
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist-js', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('dist-js-libs', () => {
    gulp.src('app/lib/html5shiv/*.js')
        .pipe(gulp.dest('dist/lib/html5shiv'));

    gulp.src('app/lib/respond/respond.min.js')
        .pipe(gulp.dest('dist/lib/respond'));
});

gulp.task('dist-fonts', () => {
    return gulp.src([
        'app/**/*.eot',
        'app/**/*.ttf',
        'app/**/*.woff',
        'app/**/*.woff2',
        'app/**/*.svg',
    ]).pipe(gulp.dest('dist'));
});

gulp.task('dist-img', () => {
    return gulp.src([
        'app/img/**/*.svg',
        'app/img/**/*.jpg',
        'app/img/**/*.png',
        'app/img/**/*.ico',
        // These last files for PWA
        'app/img/**/*.json',
        'app/img/**/*.xml'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('dist', ['dist-html', 'dist-css', 'dist-fonts', 'dist-js', 'dist-js-libs', 'dist-img']);
/* ========================= */

gulp.task('remove-dist', () => {
    return gulp.src('dist')
        .pipe(cleaner({
            read: false
        }));
});
