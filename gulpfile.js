import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import replace from 'gulp-replace';
import changed from 'gulp-changed';

// Minify HTML files
gulp.task('minify-html', () => {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'));
});

// Minify CSS files and update image references
gulp.task('minify-css', () => {
  return gulp.src('assets/css/*.css')
  .pipe(cleanCSS())
    .pipe(replace(/\.(jpg|jpeg|png)/g, '.webp'))
    .pipe(gulp.dest('dist/assets/css'));
});

// Minify JavaScript files and update image references
gulp.task('minify-js', () => {
  return gulp.src('assets/js/*.js')
    .pipe(terser())
    .pipe(replace(/\.(jpg|jpeg|png)/g, '.webp'))
    .pipe(gulp.dest('dist/assets/js'));
});

// Compress images and convert to WebP (excluding SVG and other formats)
gulp.task('compress-images', () => {
  return gulp.src(['assets/img/**/*.{jpg,jpeg,png}'])
    .pipe(changed('dist/assets/img', { extension: '.webp' }))
    .pipe(imagemin())
    .pipe(webp())
    .pipe(gulp.dest('dist/assets/img'));
});

// Copy other image formats and assets (excluding CSS, JS, and already processed images)
gulp.task('copy-assets', () => {
  return gulp.src(['assets/**/*', '!assets/css/**/*', '!assets/js/**/*', '!assets/img/**/*.{jpg,jpeg,png}'])
    .pipe(gulp.dest('dist/assets'));
});

// Replace image references in HTML files (excluding SVG and other formats)
gulp.task('replace-html-references', () => {
  return gulp.src('dist/**/*.html')
    .pipe(replace(/\.(jpg|jpeg|png)/g, '.webp'))
    .pipe(gulp.dest('dist'));
});

// Default task to run all tasks in sequence
gulp.task('default', gulp.series(
  gulp.parallel('minify-html', 'minify-css', 'minify-js', 'compress-images', 'copy-assets'),
  'replace-html-references'
));
