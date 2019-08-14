var   gulp          = require('gulp'),
		// gutil         = require('gulp-util'),
		wait = require('gulp-wait'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		cleancss      = require('gulp-clean-css'),
		// rename        = require('gulp-rename'),
		sourcemaps = require('gulp-sourcemaps'),
		plumber       = require('gulp-plumber'),
		rigger        = require('gulp-rigger'), //assembly html & js
		autoprefixer  = require('gulp-autoprefixer')
		// uglify        = require('gulp-uglify'), //minify
		// rsync         = require('gulp-rsync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {baseDir: 'app'},
		notify: false,
		// open: false,
		// online: false, // work offline
		// tunnel: true, tunnel: "develop", // demo page: http://develop.localtunnel.me
	})
});

// #html
gulp.task('layout', function () {
   return gulp.src('src/*.html')
   .pipe(plumber())
   .pipe(rigger())
   .pipe(gulp.dest('app/')) //to folder
	.pipe(browserSync.stream());
});

// #css
gulp.task('styles', function() {
	return gulp.src('src/scss/**/*.scss')
	.pipe(wait(200))
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expanded' }))
	.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
	// .pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 2 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 }}})) //comment out when debugging (opt.)
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

// #js
gulp.task('scripts', function() {
	return gulp.src([
		'src/libs/all.js',
		'src/js/main.js', // always at the end
		])
	.pipe(plumber())
	.pipe(rigger())
	.pipe(concat('scripts.js'))
	// .pipe(uglify()) // minify (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream());
});

// gulp.task('rsync', function() {
// 	return gulp.src('app/**')
// 	.pipe(rsync({
// 		root: 'app/',
// 		hostname: 'username@yousite.com',
// 		destination: 'yousite/public_html/',
// 		// include: ['*.htaccess'], // Includes files to deploy
// 		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
// 		recursive: true,
// 		archive: true,
// 		silent: false,
// 		compress: true
// 	}))
// });

gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss',{readDelay: 100}, gulp.series('styles'));
	gulp.watch(['libs/**/*.js', 'src/js/main.js'], gulp.series('scripts'));
	gulp.watch('src/**/*.html', gulp.series('layout'))
});
gulp.task('default', gulp.parallel('layout','styles', 'scripts','browser-sync', 'watch'));