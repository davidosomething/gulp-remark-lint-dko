# gulp-remark-lint-dko

> Gulp task using remark and remark-lint to lint markdown files and output
> stylish results

![Example output](https://raw.githubusercontent.com/davidosomething/gulp-remark-lint-dko/master/screenshot.png)

## Install

```
$ npm install --save-dev gulp-remark-lint-dko
```

## Usage

Outputs results to stdout.

```js
var gulp = require('gulp');
var lint = require('gulp-remark-lint-dko');

gulp.task('lintmarkdown', function () {
  return gulp.src('md/**/*.md')
    .pipe(lint({
      rules: {
        'definition-case': false,
        'emphasis-marker': '_',
      }
    }))
    .pipe(lint.report());
});
```

## Roadmap

New project! Pull requests welcome!

- [ ] gulp error on for invalid files and rule config
- [ ] read rules from remark config files (package.json, rc file)
- [ ] fail on error/warning
- [ ] output results to file
- [ ] tests, CI on travis and auto-npm-publish

## License

MIT © [David O'Trakoun](http://davidosomething.com)
