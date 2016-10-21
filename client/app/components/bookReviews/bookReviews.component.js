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
var reviews_service_1 = require('../../services/reviews.service');
var BookReviewsComponent = (function () {
    function BookReviewsComponent(reviewsService) {
        this.reviewsService = reviewsService;
        this.myRevService = reviewsService;
    }
    BookReviewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myRevService.getReviewsBook(this.bookId)
            .subscribe(function (reviews) {
            _this.reviews = reviews;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BookReviewsComponent.prototype, "bookId", void 0);
    BookReviewsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bookReview',
            providers: [reviews_service_1.ReviewsService],
            templateUrl: 'bookReviews.component.html',
            styleUrls: ['bookReviews.component.css']
        }), 
        __metadata('design:paramtypes', [reviews_service_1.ReviewsService])
    ], BookReviewsComponent);
    return BookReviewsComponent;
}());
exports.BookReviewsComponent = BookReviewsComponent;
//# sourceMappingURL=bookReviews.component.js.map