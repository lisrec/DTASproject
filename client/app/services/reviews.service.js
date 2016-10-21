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
var ReviewsService = (function () {
    function ReviewsService(http) {
        this.http = http;
    }
    ReviewsService.prototype.getReviews = function () {
        return this.http.get('/api/reviews')
            .map(function (res) { return res.json(); });
    };
    ReviewsService.prototype.getReviewsBook = function (id) {
        return this.http.get('/api/reviews/book/' + id)
            .map(function (res) { return res.json(); });
    };
    ReviewsService.prototype.getReviewsAuthor = function (id) {
        return this.http.get('/api/reviews/author/' + id)
            .map(function (res) { return res.json(); });
    };
    ReviewsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReviewsService);
    return ReviewsService;
}());
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map