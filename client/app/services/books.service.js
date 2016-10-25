"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var BooksService = (function () {
    function BooksService(http) {
        this.http = http;
    }
    BooksService.prototype.getBooks = function () {
        return this.http.get('/api/books')
            .map(function (res) { return res.json(); });
    };
    BooksService.prototype.getBooksRevsCount = function (id) {
        return this.http.get('/api/bookRevs/' + id)
            .map(function (res) { return res.json(); });
    };
    BooksService.prototype.getBook = function (id) {
        return this.http.get('/api/book/' + id)
            .map(function (res) { return res.json(); });
    };
    BooksService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BooksService);
    return BooksService;
}());
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map