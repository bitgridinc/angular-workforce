[ ![Codeship Status for bitgridinc/app](https://www.codeship.io/projects/f1878490-40f5-0132-1a3f-265751b913a8/status)](https://www.codeship.io/projects/44037)

App
===

I've been testing exclusively with Chrome. The AngularJS Batarang extension is helpful in some cases.

Notes
-----
0. We're using libsass for compiling our scss (Sass) files, which requires some manual steps to support both Windows and Linux. Running ```npm install gulp-sass --save-dev``` only installs bindings for the current OS. To ensure our Sass compiles across operating systems, ensure both binding exist.
