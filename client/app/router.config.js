"use strict";
var booksGrid_component_1 = require('./components/booksGrid/booksGrid.component');
var bookDetails_component_1 = require('./components/bookDetails/bookDetails.component');
var about_component_1 = require('./components/about/about.component');
exports.RouterConf = [
    { path: '', component: booksGrid_component_1.BooksGridComponent },
    { path: 'books', component: booksGrid_component_1.BooksGridComponent },
    { path: 'books/cat/:category', component: booksGrid_component_1.BooksGridComponent },
    { path: 'book/:id', component: bookDetails_component_1.BookDetailsComponent },
    { path: 'about', component: about_component_1.AboutComponent }
];
//# sourceMappingURL=router.config.js.map