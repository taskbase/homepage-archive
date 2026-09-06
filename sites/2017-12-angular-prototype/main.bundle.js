webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<notify></notify>\n<div class=\"app-root\">\n  <app-navbar></app-navbar>\n  <mat-sidenav-container class=\"example-container\">\n    <mat-sidenav #sidenav\n                 class=\"sidenav\"\n                 [opened]=\"sidenavState.open\"\n                 (closed)=\"sidenavState.open = false\"\n                 (opened)=\"sidenaveState.open = true\"\n                 position=\"end\">\n      <br>\n      <app-menu-items alignment=\"vertical\"></app-menu-items>\n    </mat-sidenav>\n    <mat-sidenav-content>\n      <div class=\"app-body\">\n        <router-outlet></router-outlet>\n      </div>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n  <app-footer></app-footer>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".app-root {\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 100vh;\n  -ms-flex-direction: column;\n      flex-direction: column; }\n  .app-root .app-body {\n    -ms-flex-positive: 1;\n        flex-grow: 1; }\n\n.example-container {\n  position: absolute;\n  top: 50px;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n  .example-container .sidenav {\n    width: 200px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidenav_service__ = __webpack_require__("../../../../../src/app/sidenav.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(sidenavService) {
        this.sidenavService = sidenavService;
        this.sidenavState = this.sidenavService.sidenavState;
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sidenav_service__["a" /* SidenavService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__navbar_navbar_component__ = __webpack_require__("../../../../../src/app/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__("../../../../../src/app/components/components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__landing_jumbo_jumbo_component__ = __webpack_require__("../../../../../src/app/landing/jumbo/jumbo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__ = __webpack_require__("../../../../../src/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__impressum_impressum_component__ = __webpack_require__("../../../../../src/app/impressum/impressum.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_cdk_overlay__ = __webpack_require__("../../../cdk/esm5/overlay.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__blog_blog_module__ = __webpack_require__("../../../../../src/app/blog/blog.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__landing_landing_component__ = __webpack_require__("../../../../../src/app/landing/landing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__routing_routes_module__ = __webpack_require__("../../../../../src/app/routing/routes.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__navbar_menu_items_menu_items_component__ = __webpack_require__("../../../../../src/app/navbar/menu-items/menu-items.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__team_team_component__ = __webpack_require__("../../../../../src/app/team/team.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__team_business_card_business_card_component__ = __webpack_require__("../../../../../src/app/team/business-card/business-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__landing_tb_modules_tb_modules_component__ = __webpack_require__("../../../../../src/app/landing/tb-modules/tb-modules.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__landing_module_example_module_example_component__ = __webpack_require__("../../../../../src/app/landing/module-example/module-example.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__landing_bla_module_bla_module_component__ = __webpack_require__("../../../../../src/app/landing/bla-module/bla-module.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__landing_blub_module_blub_module_component__ = __webpack_require__("../../../../../src/app/landing/blub-module/blub-module.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__landing_barf_module_barf_module_component__ = __webpack_require__("../../../../../src/app/landing/barf-module/barf-module.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__landing_blab_module_blab_module_component__ = __webpack_require__("../../../../../src/app/landing/blab-module/blab-module.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__landing_showcases_showcases_component__ = __webpack_require__("../../../../../src/app/landing/showcases/showcases.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__landing_customers_customers_component__ = __webpack_require__("../../../../../src/app/landing/customers/customers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__landing_testimonials_testimonials_component__ = __webpack_require__("../../../../../src/app/landing/testimonials/testimonials.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__landing_contact_contact_component__ = __webpack_require__("../../../../../src/app/landing/contact/contact.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__landing_jumbo_newsletter_service__ = __webpack_require__("../../../../../src/app/landing/jumbo/newsletter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_notify_angular__ = __webpack_require__("../../../../notify-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__landing_contact_contact_form_service__ = __webpack_require__("../../../../../src/app/landing/contact/contact-form.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__sidenav_service__ = __webpack_require__("../../../../../src/app/sidenav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__landing_sellingpoint_sellingpoint_component__ = __webpack_require__("../../../../../src/app/landing/sellingpoint/sellingpoint.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material__["b" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material__["c" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_cdk_overlay__["e" /* OverlayModule */],
                __WEBPACK_IMPORTED_MODULE_11__blog_blog_module__["a" /* BlogModule */],
                __WEBPACK_IMPORTED_MODULE_14__routing_routes_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_30__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_31_notify_angular__["a" /* NotifyModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7__angular_material__["d" /* MatSidenavModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_3__navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_5__landing_jumbo_jumbo_component__["a" /* JumboComponent */],
                __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_9__impressum_impressum_component__["a" /* ImpressumComponent */],
                __WEBPACK_IMPORTED_MODULE_12__landing_landing_component__["a" /* LandingComponent */],
                __WEBPACK_IMPORTED_MODULE_13__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_16__navbar_menu_items_menu_items_component__["a" /* MenuItemsComponent */],
                __WEBPACK_IMPORTED_MODULE_17__team_team_component__["a" /* TeamPageComponent */],
                __WEBPACK_IMPORTED_MODULE_18__team_business_card_business_card_component__["a" /* BusinessCardComponent */],
                __WEBPACK_IMPORTED_MODULE_19__landing_tb_modules_tb_modules_component__["a" /* TbModulesComponent */],
                __WEBPACK_IMPORTED_MODULE_20__landing_module_example_module_example_component__["a" /* ModuleExampleComponent */],
                __WEBPACK_IMPORTED_MODULE_21__landing_bla_module_bla_module_component__["a" /* BlaModuleComponent */],
                __WEBPACK_IMPORTED_MODULE_22__landing_blub_module_blub_module_component__["a" /* BlubModuleComponent */],
                __WEBPACK_IMPORTED_MODULE_23__landing_barf_module_barf_module_component__["a" /* BarfModuleComponent */],
                __WEBPACK_IMPORTED_MODULE_24__landing_blab_module_blab_module_component__["a" /* BlabModuleComponent */],
                __WEBPACK_IMPORTED_MODULE_25__landing_showcases_showcases_component__["a" /* ShowcasesComponent */],
                __WEBPACK_IMPORTED_MODULE_26__landing_customers_customers_component__["a" /* CustomersComponent */],
                __WEBPACK_IMPORTED_MODULE_27__landing_testimonials_testimonials_component__["a" /* TestimonialsComponent */],
                __WEBPACK_IMPORTED_MODULE_28__landing_contact_contact_component__["a" /* ContactComponent */],
                __WEBPACK_IMPORTED_MODULE_34__landing_sellingpoint_sellingpoint_component__["a" /* SellingpointComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_29__landing_jumbo_newsletter_service__["a" /* NewsletterService */],
                __WEBPACK_IMPORTED_MODULE_32__landing_contact_contact_form_service__["a" /* ContactFormService */],
                __WEBPACK_IMPORTED_MODULE_33__sidenav_service__["a" /* SidenavService */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__impressum_impressum_component__["a" /* ImpressumComponent */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/blog/blog.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blog_blog_component__ = __webpack_require__("../../../../../src/app/blog/blog/blog.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BlogModule = (function () {
    function BlogModule() {
    }
    BlogModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__blog_blog_component__["a" /* BlogComponent */]
            ]
        })
    ], BlogModule);
    return BlogModule;
}());



/***/ }),

/***/ "../../../../../src/app/blog/blog/blog.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"regular-page\">\n  <p>\n    blog works!\n  </p>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/blog/blog/blog.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/blog/blog/blog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BlogComponent = (function () {
    function BlogComponent() {
    }
    BlogComponent.prototype.ngOnInit = function () {
    };
    BlogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-blog',
            template: __webpack_require__("../../../../../src/app/blog/blog/blog.component.html"),
            styles: [__webpack_require__("../../../../../src/app/blog/blog/blog.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BlogComponent);
    return BlogComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [],
            exports: []
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "../../../../../src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n  <div>\n    Copyright © {{currentYear}} Taskbase (<a href=\"mailto:info@taskbase.com\">info@taskbase.com</a>) |&nbsp;<a routerLink=\"impressum\" class=\"impressum\">Impressum</a>\n  </div>\n</footer>\n"

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".footer {\n  background: #434343;\n  color: #FFFFFF; }\n\n.footer {\n  padding: 10px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  font-size: 12px;\n  height: 50px; }\n  .footer a {\n    cursor: pointer;\n    color: inherit; }\n  .footer .impressum {\n    cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_cdk_overlay__ = __webpack_require__("../../../cdk/esm5/overlay.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_cdk_portal__ = __webpack_require__("../../../cdk/esm5/portal.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__impressum_impressum_component__ = __webpack_require__("../../../../../src/app/impressum/impressum.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FooterComponent = (function () {
    function FooterComponent(overlay) {
        this.overlay = overlay;
        this.currentYear = new Date().getFullYear();
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent.prototype.openImpressum = function () {
        var overlayRef = this.overlay.create();
        var userProfilePortal = new __WEBPACK_IMPORTED_MODULE_2__angular_cdk_portal__["d" /* ComponentPortal */](__WEBPACK_IMPORTED_MODULE_3__impressum_impressum_component__["a" /* ImpressumComponent */]);
        overlayRef.attach(userProfilePortal);
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/footer/footer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_cdk_overlay__["b" /* Overlay */]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/impressum/impressum.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"regular-page\">\n  <mat-card>\n    <h1>Impressum</h1>\n    <br>\n    <div style=\"font-size:20px\">\n      <div>\n        <i class=\"fa fa-star center\"  style=\"width: 30px;\" aria-hidden=\"true\"></i> Taskbase AG\n      </div>\n      <br>\n      <div>\n        <i class=\"fa fa-map-marker center\" style=\"width: 30px;\" aria-hidden=\"true\"></i> Langstrasse 119, 8004 Zürich (CH)\n      </div>\n      <br>\n      <div>\n        <i class=\"fa fa-phone center\" style=\"width: 30px;\" aria-hidden=\"true\"></i> +41 (0) 79 817 74 19\n      </div>\n      <br>\n      <div>\n        <i class=\"fa fa-envelope center\" style=\"width: 30px;\" aria-hidden=\"true\"></i>\n        <a href=\"mailto:info@taskbase.com\">info@taskbase.com</a>\n      </div>\n    </div>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/impressum/impressum.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/impressum/impressum.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImpressumComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ImpressumComponent = (function () {
    function ImpressumComponent() {
    }
    ImpressumComponent.prototype.ngOnInit = function () {
    };
    ImpressumComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-impressum',
            template: __webpack_require__("../../../../../src/app/impressum/impressum.component.html"),
            styles: [__webpack_require__("../../../../../src/app/impressum/impressum.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ImpressumComponent);
    return ImpressumComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/barf-module/barf-module.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>\n  Blub Module\n</h1>\n<p>\n  Blub Module is really cool.\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/landing/barf-module/barf-module.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/barf-module/barf-module.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarfModuleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BarfModuleComponent = (function () {
    function BarfModuleComponent() {
    }
    BarfModuleComponent.prototype.ngOnInit = function () {
    };
    BarfModuleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-barf-module',
            template: __webpack_require__("../../../../../src/app/landing/barf-module/barf-module.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/barf-module/barf-module.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BarfModuleComponent);
    return BarfModuleComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/bla-module/bla-module.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>\n  Bla Module\n</h1>\n<p>\n  Bla Module is da best\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/landing/bla-module/bla-module.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/bla-module/bla-module.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlaModuleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BlaModuleComponent = (function () {
    function BlaModuleComponent() {
    }
    BlaModuleComponent.prototype.ngOnInit = function () {
    };
    BlaModuleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-bla-module',
            template: __webpack_require__("../../../../../src/app/landing/bla-module/bla-module.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/bla-module/bla-module.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BlaModuleComponent);
    return BlaModuleComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/blab-module/blab-module.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>\n  Blarb Module\n</h1>\n<p>\n  Blarb Module is amazing.\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/landing/blab-module/blab-module.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/blab-module/blab-module.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlabModuleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BlabModuleComponent = (function () {
    function BlabModuleComponent() {
    }
    BlabModuleComponent.prototype.ngOnInit = function () {
    };
    BlabModuleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-blab-module',
            template: __webpack_require__("../../../../../src/app/landing/blab-module/blab-module.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/blab-module/blab-module.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BlabModuleComponent);
    return BlabModuleComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/blub-module/blub-module.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>\n  Blub Module\n</h1>\n<p>\n  Without blub module, you don't know what to do.\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/landing/blub-module/blub-module.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/blub-module/blub-module.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlubModuleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BlubModuleComponent = (function () {
    function BlubModuleComponent() {
    }
    BlubModuleComponent.prototype.ngOnInit = function () {
    };
    BlubModuleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-blub-module',
            template: __webpack_require__("../../../../../src/app/landing/blub-module/blub-module.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/blub-module/blub-module.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BlubModuleComponent);
    return BlubModuleComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/contact/contact-form.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactFormService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_notify_angular__ = __webpack_require__("../../../../notify-angular/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactFormService = (function () {
    function ContactFormService(http, notify) {
        this.http = http;
        this.notify = notify;
        this.backendHost = 'https://taskbase-homepage-backend.herokuapp.com';
        this.backendApi = this.backendHost + "/contact";
    }
    ContactFormService.prototype.sendContactForm = function (formContent) {
        var _this = this;
        var req = this.http.post("" + this.backendApi, formContent);
        var notificationPosition = {
            bottom: 0,
            left: 0,
            right: 0
        };
        req.subscribe(function (resp) {
            _this.notify.success('Danke für die Nachricht! Wir werden uns in Kürze bei Ihnen melden.', {
                position: notificationPosition,
                timer: 4000
            });
        }, function (errorResp) {
            var errorMessage = 'Oops, da ist was schief gelaufen.';
            _this.notify.error(errorMessage, { position: notificationPosition });
        });
    };
    ContactFormService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_notify_angular__["b" /* NotifyService */]])
    ], ContactFormService);
    return ContactFormService;
}());



/***/ }),

/***/ "../../../../../src/app/landing/contact/contact.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"contact\">\n  <mat-card class=\"card\">\n    <h1 class=\"title\">Kontakt</h1>\n    <form class=\"example-form\" [formGroup]=\"contactForm\">\n      <mat-form-field class=\"example-full-width\">\n        <input matInput placeholder=\"Ihr Name\" formControlName=\"name\" type=\"text\">\n      </mat-form-field>\n      <mat-form-field class=\"example-full-width\">\n        <input matInput placeholder=\"Ihre Email\" formControlName=\"email\" type=\"email\">\n      </mat-form-field>\n      <mat-form-field class=\"example-full-width\">\n        <textarea matInput\n                  placeholder=\"Ihre Nachricht\"\n                  formControlName=\"message\"\n                  matTextareaAutosize\n                  matAutosizeMinRows=\"2\"\n                  matAutosizeMaxRows=\"5\"\n                  required>\n        </textarea>\n        <mat-error *ngIf=\"message.invalid\">{{getErrorMessage()}}</mat-error>\n      </mat-form-field>\n    </form>\n    <br>\n    <button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"message.invalid\" type=\"submit\" mat-raised-button>\n      Senden\n    </button>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/landing/contact/contact.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".contact {\n  background: #009688;\n  color: #FFFFFF; }\n\n.contact {\n  padding: 80px 40px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center; }\n  .contact .card {\n    max-width: 700px; }\n    .contact .card .title {\n      text-align: center; }\n\n.example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/contact/contact.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_form_service__ = __webpack_require__("../../../../../src/app/landing/contact/contact-form.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactComponent = (function () {
    function ContactComponent(contactFormService, formBuilder) {
        this.contactFormService = contactFormService;
        this.formBuilder = formBuilder;
        this.contactForm = this.formBuilder.group({
            name: [''],
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].email]],
            message: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required]],
        });
        this.name = this.contactForm.get('name');
        this.email = this.contactForm.get('email');
        this.message = this.contactForm.get('message');
    }
    ContactComponent.prototype.ngOnInit = function () {
    };
    ContactComponent.prototype.onSubmit = function () {
        this.contactFormService.sendContactForm(this.contactForm.getRawValue());
    };
    ContactComponent.prototype.getErrorMessage = function () {
        return this.message.hasError('required') ? 'Sie müssen eine Nachricht eingeben.' : '';
    };
    ContactComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-contact',
            template: __webpack_require__("../../../../../src/app/landing/contact/contact.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/contact/contact.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__contact_form_service__["a" /* ContactFormService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/customers/customers.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"customers\">\n  <h1>Zufriedene Kunden</h1>\n  <div class=\"logo-wrapper\">\n    <div style=\"height: 50px\"\n         class=\"logo\"\n         *ngFor=\"let customer of customers\"\n    >\n      <img [src]=\"customer.logo\"\n           [ngStyle]=\"customer.style\">\n    </div>\n  \n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/landing/customers/customers.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".customers {\n  background: #FFFFFF;\n  color: #009688; }\n\n.customers {\n  padding: 80px 40px;\n  text-align: center; }\n  .customers .logo-wrapper {\n    max-width: 900px;\n    margin: 0 auto;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n    -ms-flex-pack: distribute;\n        justify-content: space-around; }\n    .customers .logo-wrapper .logo {\n      padding: 20px;\n      background: rgba(0, 0, 0, 0.1);\n      border-radius: 5px;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: center;\n          justify-content: center;\n      -ms-flex-align: center;\n          align-items: center;\n      margin: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/customers/customers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CustomersComponent = (function () {
    function CustomersComponent() {
        this.customers = [
            {
                logo: this.buildLogoUrl('e-maths.png'),
                style: {
                    height: '30px',
                    width: 'auto'
                }
            },
            {
                logo: this.buildLogoUrl('acadilly.png'),
                style: {
                    height: '45px',
                    width: 'auto'
                }
            },
            {
                logo: this.buildLogoUrl('lernnavi-logo.svg'),
                style: {
                    height: '50px',
                    width: 'auto'
                }
            }
        ];
    }
    CustomersComponent.prototype.ngOnInit = function () {
    };
    CustomersComponent.prototype.buildLogoUrl = function (logo) {
        return "assets/img/logos/" + logo;
    };
    CustomersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-customers',
            template: __webpack_require__("../../../../../src/app/landing/customers/customers.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/customers/customers.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CustomersComponent);
    return CustomersComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/jumbo/jumbo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbo-wrapper\">\n  <img src=\"assets/img/bg-clipped.png\"\n       *ngIf=\"showImage\"\n       class=\"jumbo-img\">\n  <img src=\"assets/img/logos/taskbase-watermark.svg\"\n       class=\"jumbo-watermark\">\n  <div class=\"jumbo-content\">\n    <div class=\"jumbo-headline\">\n      Wir entwickeln Ihr Lernsytem\n    </div>\n    <div class=\"jumbo-text\">\n      Taskbase stellt moderne Lernsysteme für Schulen und Universitäten her.\n    </div>\n    <div class=\"form-wrapper\">\n      <form class=\"jumbo-newsletter\" [formGroup]=\"newsletterForm\" novalidate (ngSubmit)=\"onSubmit()\">\n        <input class=\"newsletter-email\" formControlName=\"email\" placeholder=\"Email Adresse...\" type=\"email\">\n        <div class=\"newsletter-submit-button\">\n          <button mat-raised-button\n                  type=\"submit\"\n                  [disabled]=\"newsletterForm.invalid && newsletterForm.touched\">\n            Newsletter abonnieren\n          </button>\n        </div>\n      </form>\n      <div class=\"errors\">\n        <div *ngIf=\"newsletterForm.touched && email.hasError('email') && !email?.hasError('required')\">\n          Bitte geben Sie eine gültige Email Adresse ein.\n        </div>\n        <div *ngIf=\"newsletterForm.touched && email?.hasError('required')\">\n          Sie müssen eine Email eingeben.\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/landing/jumbo/jumbo.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".jumbo-wrapper {\n  background: #009688;\n  color: #FFFFFF; }\n\n.jumbo-wrapper {\n  background-image: linear-gradient(to bottom right, #009688, #2CBFA2);\n  min-height: 500px;\n  position: relative;\n  padding: 20px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center; }\n  .jumbo-wrapper .jumbo-img {\n    max-height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0; }\n  .jumbo-wrapper .jumbo-watermark {\n    max-height: 100%;\n    position: absolute;\n    bottom: 0;\n    right: 0; }\n  .jumbo-wrapper .jumbo-content {\n    position: relative;\n    max-width: 600px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column; }\n    @media (max-width: 900px) {\n      .jumbo-wrapper .jumbo-content {\n        text-align: center; } }\n    @media (min-width: 901px) and (max-width: 1200px) {\n      .jumbo-wrapper .jumbo-content {\n        margin-left: 250px; } }\n    .jumbo-wrapper .jumbo-content .jumbo-headline {\n      color: #FFFFFF;\n      font-size: 40px;\n      font-weight: bold; }\n    .jumbo-wrapper .jumbo-content .jumbo-text {\n      margin-top: 20px;\n      font-size: 18px; }\n    .jumbo-wrapper .jumbo-content .form-wrapper {\n      text-align: left;\n      height: 200px; }\n      .jumbo-wrapper .jumbo-content .form-wrapper .jumbo-newsletter {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n            align-items: center;\n        margin-top: 70px;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n        -ms-flex-pack: center;\n            justify-content: center; }\n        .jumbo-wrapper .jumbo-content .form-wrapper .jumbo-newsletter .newsletter-email {\n          -ms-flex-positive: 2;\n              flex-grow: 2;\n          margin-right: 5px;\n          padding: 9px;\n          border-radius: 2px;\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          border: none;\n          margin-top: 10px; }\n        .jumbo-wrapper .jumbo-content .form-wrapper .jumbo-newsletter .newsletter-submit-button {\n          color: black;\n          margin-top: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/jumbo/jumbo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JumboComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__newsletter_service__ = __webpack_require__("../../../../../src/app/landing/jumbo/newsletter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SHOW_IMAGE_ABOVE = 900;
var JumboComponent = (function () {
    function JumboComponent(newsletterService, formBuilder) {
        this.newsletterService = newsletterService;
        this.formBuilder = formBuilder;
        this.newsletterForm = this.formBuilder.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].email]],
        });
        this.email = this.newsletterForm.get('email');
    }
    JumboComponent.prototype.ngOnChanges = function (changes) {
        this.setShowImage(this.screenWidth);
    };
    JumboComponent.prototype.setShowImage = function (windowSize) {
        this.showImage = windowSize > SHOW_IMAGE_ABOVE;
    };
    JumboComponent.prototype.subscribeToNewsletter = function () {
        this.newsletterService.subscribe(this.email.value);
    };
    JumboComponent.prototype.onSubmit = function () {
        this.subscribeToNewsletter();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Number)
    ], JumboComponent.prototype, "screenWidth", void 0);
    JumboComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-jumbo',
            template: __webpack_require__("../../../../../src/app/landing/jumbo/jumbo.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/jumbo/jumbo.component.scss")],
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__newsletter_service__["a" /* NewsletterService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]])
    ], JumboComponent);
    return JumboComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/jumbo/newsletter.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsletterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_notify_angular__ = __webpack_require__("../../../../notify-angular/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewsletterService = (function () {
    function NewsletterService(http, notify) {
        this.http = http;
        this.notify = notify;
        this.backendHost = 'https://taskbase-homepage-backend.herokuapp.com';
        this.backendApi = this.backendHost + "/subscribe";
        this.listId = '84283b9519';
    }
    NewsletterService.prototype.subscribe = function (email) {
        var _this = this;
        var params = { listid: this.listId };
        var options = { params: params };
        var req = this.http.post("" + this.backendApi, { EMAIL: email }, options);
        var notificationPosition = {
            bottom: 0,
            left: 0,
            right: 0
        };
        req.subscribe(function (resp) {
            _this.notify.success('Danke für die Anmeldung!', { position: notificationPosition });
        }, function (errorResp) {
            var isMailchimpError = errorResp && errorResp.error && errorResp.error.body && errorResp.error.body.title;
            var translateMailchimpError = function (mailchimpErrorTitle) {
                if (mailchimpErrorTitle === 'Member Exists') {
                    return 'Diese Email ist schon für den Newsletter angemeldet!';
                }
                else {
                    return 'Oops, da ist was schief gelaufen.';
                }
            };
            var errorMessage = isMailchimpError ? translateMailchimpError(errorResp.error.body.title) : 'Unbekannter Fehler';
            _this.notify.error(errorMessage, { position: notificationPosition });
        });
    };
    NewsletterService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_notify_angular__["b" /* NotifyService */]])
    ], NewsletterService);
    return NewsletterService;
}());



/***/ }),

/***/ "../../../../../src/app/landing/landing.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-content\">\n  <app-jumbo [screenWidth]=\"screenWidth\"></app-jumbo>\n  <app-tb-modules [screenWidth]=\"screenWidth\"></app-tb-modules>\n  <app-sellingpoint></app-sellingpoint>\n  <app-showcases></app-showcases>\n  <app-testimonials></app-testimonials>\n  <app-customers></app-customers>\n  <app-contact></app-contact>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/landing/landing.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".white-panel {\n  background: white; }\n\n.werkzeugkasten {\n  padding-top: 60px;\n  text-align: center;\n  color: #009688; }\n  @media (min-width: 800px) {\n    .werkzeugkasten h1 {\n      font-size: 40px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/landing.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LandingComponent = (function () {
    function LandingComponent() {
        this.screenWidth = window.innerWidth;
    }
    LandingComponent.prototype.ngOnInit = function () {
    };
    LandingComponent.prototype.onResize = function (event) {
        this.screenWidth = event.target.innerWidth;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LandingComponent.prototype, "onResize", null);
    LandingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-landing',
            template: __webpack_require__("../../../../../src/app/landing/landing.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/landing.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LandingComponent);
    return LandingComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/module-example/module-example.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  module-example works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/landing/module-example/module-example.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/module-example/module-example.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleExampleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ModuleExampleComponent = (function () {
    function ModuleExampleComponent() {
    }
    ModuleExampleComponent.prototype.ngOnInit = function () {
    };
    ModuleExampleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-module-example',
            template: __webpack_require__("../../../../../src/app/landing/module-example/module-example.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/module-example/module-example.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ModuleExampleComponent);
    return ModuleExampleComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/sellingpoint/sellingpoint.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"what-we-do\">\n  <img src=\"assets/img/valentines-heart.svg\"\n       height=\"90\"\n       width=\"90\"\n       alt=\"\">\n  <div class=\"text\">\n    Mit top Technologien, agilem Projektmanagement\n    und viel Leidenschaft entwickel wir Ihre interaktive\n    Lernlösungen.\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/landing/sellingpoint/sellingpoint.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".what-we-do {\n  background: #FFFFFF;\n  color: #009688; }\n\n.what-we-do {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -ms-flex-align: center;\n      align-items: center;\n  font-size: 30px;\n  padding: 50px;\n  min-height: 250px; }\n  .what-we-do .text {\n    text-align: center;\n    max-width: 800px;\n    font-weight: bold; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/sellingpoint/sellingpoint.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SellingpointComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SellingpointComponent = (function () {
    function SellingpointComponent() {
    }
    SellingpointComponent.prototype.ngOnInit = function () {
    };
    SellingpointComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-sellingpoint',
            template: __webpack_require__("../../../../../src/app/landing/sellingpoint/sellingpoint.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/sellingpoint/sellingpoint.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SellingpointComponent);
    return SellingpointComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/showcases/showcases.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"showcases\">\n  <h1>Showcases</h1>\n  <div class=\"logo-wrapper\">\n    <div style=\"height: 50px\"\n         class=\"logo\"\n         *ngFor=\"let showcase of showcases\"\n    >\n      <img [src]=\"showcase.logo\"\n           [ngStyle]=\"showcase.style\">\n    </div>\n  \n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/landing/showcases/showcases.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".showcases, .showcases h1 {\n  background: #434343;\n  color: #FFFFFF; }\n\n.showcases {\n  margin: 0 auto;\n  padding: 80px 40px;\n  text-align: center; }\n  .showcases .logo-wrapper {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n    max-width: 900px;\n    margin: 0 auto; }\n    .showcases .logo-wrapper .logo {\n      padding: 20px;\n      background: rgba(255, 255, 255, 0.1);\n      border-radius: 5px;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: center;\n          justify-content: center;\n      -ms-flex-align: center;\n          align-items: center;\n      margin: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/showcases/showcases.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowcasesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShowcasesComponent = (function () {
    function ShowcasesComponent() {
        this.showcases = [
            {
                logo: this.buildLogoUrl('e-maths.png'),
                style: {
                    height: '30px',
                    width: 'auto'
                }
            },
            {
                logo: this.buildLogoUrl('acadilly.png'),
                style: {
                    height: '45px',
                    width: 'auto'
                }
            },
            {
                logo: this.buildLogoUrl('lernnavi-logo.svg'),
                style: {
                    height: '50px',
                    width: 'auto'
                }
            }
        ];
    }
    ShowcasesComponent.prototype.ngOnInit = function () {
    };
    ShowcasesComponent.prototype.buildLogoUrl = function (logo) {
        return "assets/img/logos/" + logo;
    };
    ShowcasesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-showcases',
            template: __webpack_require__("../../../../../src/app/landing/showcases/showcases.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/showcases/showcases.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ShowcasesComponent);
    return ShowcasesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/tb-modules/tb-modules.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"upper-part\">\n  <div class=\"left-img\" *ngIf=\"showLeftImage\">\n    <img src=\"assets/img/teacherfine.svg\"\n         alt=\"\">\n  </div>\n  <div class=\"tb-modules-content\">\n    <div class=\"image-wrapper\">\n      <svg #svg [attr.width]=\"width\" [attr.height]=\"height\">\n        <rect [attr.x]=\" width * 0.3\" [attr.y]=\"0\" [attr.width]=\"width * 0.4\" [attr.height]=\"150\" class=\"rect-top\"></rect>\n        <g *ngFor=\"let connector of tbModuleData; trackBy: trackByFn;\">\n          <!-- ATTENTION: connector-line-wrapper and connector-line is almost identical -->\n          <path class=\"connector-line-wrapper\"\n                [ngClass]=\"{'active': connector.module === activeModule}\"\n                [attr.d]=\"connector.connectorLine\"\n                *ngIf=\"connector.module === activeModule\"\n                (click)=\"setActiveTestimonial(connector.module)\">\n          </path>\n          <path class=\"connector-line\"\n                [ngClass]=\"{'active': connector.module === activeModule}\"\n                [attr.d]=\"connector.connectorLine\"\n                (click)=\"setActiveTestimonial(connector.module)\">\n          </path>\n        </g>\n      </svg>\n\n      <div *ngFor=\"let connector of tbModuleData\"\n           class=\"schild\"\n           [ngStyle]=\"connector.schildStyle\"\n           (click)=\"setActiveTestimonial(connector.module)\">\n        {{connector.title}}\n      </div>\n\n    </div>\n  </div>\n  <div class=\"right-img\" *ngIf=\"showRightImage\">\n    <img src=\"assets/img/student.svg\"\n         alt=\"\">\n  </div>\n</div>\n\n<div class=\"displayed-module\">\n  <div [ngSwitch]=\"activeModule\">\n    <app-barf-module *ngSwitchCase=\"'barf-module'\"></app-barf-module>\n    <app-blab-module *ngSwitchCase=\"'blab-module'\"></app-blab-module>\n    <app-bla-module *ngSwitchCase=\"'bla-module'\"></app-bla-module>\n    <app-blub-module *ngSwitchCase=\"'blub-module'\"></app-blub-module>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/landing/tb-modules/tb-modules.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".upper-part .tb-modules-content .puzzle-img, .upper-part .tb-modules-content .image-wrapper {\n  position: absolute;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0; }\n\n.upper-part {\n  display: -ms-flexbox;\n  display: flex;\n  background: #f9f9f9;\n  min-height: 600px; }\n  .upper-part .left-img {\n    width: 250px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: end;\n        align-items: flex-end; }\n    .upper-part .left-img img {\n      margin-bottom: -15px; }\n  .upper-part .tb-modules-content {\n    -ms-flex-align: end;\n        align-items: flex-end;\n    -ms-flex-positive: 1;\n        flex-grow: 1;\n    position: relative; }\n    .upper-part .tb-modules-content .puzzle-img {\n      width: 200px;\n      margin-top: 30px; }\n    .upper-part .tb-modules-content .image-wrapper {\n      height: 600px;\n      position: relative;\n      width: 500px; }\n      .upper-part .tb-modules-content .image-wrapper .puzzle {\n        position: absolute;\n        top: 100px;\n        left: 150px;\n        height: 150px;\n        width: 200px; }\n      .upper-part .tb-modules-content .image-wrapper .schild {\n        position: absolute;\n        background: #159588;\n        padding: 20px;\n        width: 75px;\n        color: white;\n        font-weight: bold;\n        border-radius: 5px;\n        cursor: pointer;\n        text-align: center; }\n      .upper-part .tb-modules-content .image-wrapper svg {\n        margin-top: 100px;\n        position: absolute;\n        margin-left: auto;\n        margin-right: auto;\n        left: 0;\n        right: 0; }\n        .upper-part .tb-modules-content .image-wrapper svg .rect-top {\n          fill: #009688;\n          stroke: #009688;\n          opacity: 0.5; }\n        .upper-part .tb-modules-content .image-wrapper svg .connector-line-wrapper {\n          fill: none;\n          stroke: #009688;\n          stroke-width: 10;\n          animation: pulse 5s infinite;\n          cursor: pointer; }\n\n@keyframes pulse {\n  0% {\n    opacity: 0.1; }\n  50% {\n    opacity: 0.4; }\n  100% {\n    opacity: 0.1; } }\n        .upper-part .tb-modules-content .image-wrapper svg .connector-line {\n          fill: none;\n          stroke: black;\n          stroke-width: 2;\n          animation: pulse 5s infinite;\n          cursor: pointer; }\n\n@keyframes pulse {\n  0% {\n    opacity: 0.1; }\n  50% {\n    opacity: 0.4; }\n  100% {\n    opacity: 0.1; } }\n          .upper-part .tb-modules-content .image-wrapper svg .connector-line:hover {\n            stroke: #009688; }\n          .upper-part .tb-modules-content .image-wrapper svg .connector-line.active {\n            stroke: #009688;\n            animation: none; }\n  .upper-part .right-img {\n    width: 250px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: end;\n        align-items: flex-end; }\n\n.displayed-module {\n  padding: 60px 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/tb-modules/tb-modules.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TbModulesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SHOW_LEFT_IMAGE_ABOVE = 900;
var SHOW_RIGHT_IMAGE_ABOVE = 1200;
var TbModulesComponent = (function () {
    function TbModulesComponent() {
        // svg stuff
        this.width = 500;
        this.height = 500;
        this.tbModuleData = [{
                connectorLine: 'M152,75C150,75,116.66666666666666,57.5,100,150C83.33333333333334,242.5,50,630,50,630',
                module: 'blab-module',
                title: 'Blab',
                schildStyle: {
                    top: '350px',
                    left: '35px'
                }
            }, {
                connectorLine: 'M200,150C200,150,189.16666666666666,120,185,200C180.83333333333334,280,175,630,175,630',
                module: 'bla-module',
                title: 'Bla',
                schildStyle: {
                    top: '460px',
                    left: '125px'
                }
            }, {
                connectorLine: 'M300,150C300,150,311.6666666666667,120,315,200C318.3333333333333,280,320,630,320,630',
                module: 'blub-module',
                title: 'Blub',
                schildStyle: {
                    top: '430px',
                    left: '260px'
                }
            }, {
                connectorLine: 'M348,75C350,75,383.3333333333333,57.5,400,150C416.6666666666667,242.5,450,630,450,630',
                module: 'barf-module',
                title: 'Barf',
                schildStyle: {
                    top: '300px',
                    left: '360px'
                }
            }];
    }
    TbModulesComponent.prototype.setActiveModule = function (val) {
        this._touched = true;
        this.activeModule = val;
    };
    TbModulesComponent.prototype.ngOnChanges = function (changes) {
        this.setShowLeftImage(this.screenWidth);
        this.setShowRightImage(this.screenWidth);
    };
    TbModulesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var counter = 0;
        var iterateWhileUntouched = function () {
            if (!_this._touched) {
                _this.activeModule = _this.tbModuleData[counter++ % _this.tbModuleData.length].module;
                setTimeout(function () {
                    iterateWhileUntouched();
                }, 2500);
            }
        };
        iterateWhileUntouched();
    };
    TbModulesComponent.prototype.setShowLeftImage = function (windowSize) {
        this.showLeftImage = windowSize > SHOW_LEFT_IMAGE_ABOVE;
    };
    TbModulesComponent.prototype.setShowRightImage = function (windowSize) {
        this.showRightImage = windowSize > SHOW_RIGHT_IMAGE_ABOVE;
    };
    TbModulesComponent.prototype.trackByFn = function (index, item) {
        return item.connectorLine;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Number)
    ], TbModulesComponent.prototype, "screenWidth", void 0);
    TbModulesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tb-modules',
            template: __webpack_require__("../../../../../src/app/landing/tb-modules/tb-modules.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/tb-modules/tb-modules.component.scss")]
        })
    ], TbModulesComponent);
    return TbModulesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/landing/testimonials/testimonials.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"testimonials\">\n  <button class=\"control-wrapper\"\n          (click)=\"setActiveTestimonial(activeTestimonial-1)\">\n    <img src=\"assets/img/001-back.svg\"\n         height=\"25\"\n         width=\"25\"\n         alt=\"arrow-left\">\n  </button>\n  <div class=\"slidecontent\">\n    \n    <div class=\"picture\">\n      <div class=\"img\">\n        <img [src]=\"testimonials[activeTestimonial].pic\"\n             alt=\"\">\n      </div>\n    </div>\n    \n    <div class=\"testimonial\">\n      <div class=\"sentence\">\n        <h1>&quot;{{testimonials[activeTestimonial].sentence}}&quot;</h1>\n      </div>\n      <div class=\"name\">\n        <div>{{testimonials[activeTestimonial].name}}</div>\n      </div>\n      <div class=\"role\">\n        <div>{{testimonials[activeTestimonial].role}}</div>\n      </div>\n    </div>\n  </div>\n  <button class=\"control-wrapper\"\n          (click)=\"setActiveTestimonial(activeTestimonial+1)\">\n    <img src=\"assets/img/002-next.svg\"\n         height=\"25\"\n         width=\"25\"\n         alt=\"right\">\n  </button>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/landing/testimonials/testimonials.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".testimonials, .testimonials .slidecontent .testimonial .sentence h1 {\n  background: #009688;\n  color: #FFFFFF; }\n\n.testimonials {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  -ms-flex-align: center;\n      align-items: center; }\n  .testimonials .control-wrapper {\n    min-height: 300px;\n    padding: 20px;\n    -ms-flex-align: center;\n        align-items: center;\n    background: transparent; }\n  .testimonials .slidecontent {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-flow: row wrap;\n        flex-flow: row wrap;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n    -ms-flex-align: center;\n        align-items: center;\n    margin: 5px;\n    width: 100%; }\n    .testimonials .slidecontent .testimonial {\n      width: 80%;\n      text-align: center; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing/testimonials/testimonials.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestimonialsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TestimonialsComponent = (function () {
    function TestimonialsComponent() {
        this.activeTestimonial = 0;
        this.testimonials = [
            {
                pic: this.buildPicUrl('enrico.png'),
                name: 'Enrico De Giorgi',
                role: 'Professor, Universität St. Gallen',
                sentence: 'Bei der Lernplattform ‘e-maths.ch’ hat Taskbase keine Wünsche offen gelassen. Ich kann mich auf dieses Team verlassen.'
            },
            {
                pic: this.buildPicUrl('jaime.png'),
                name: 'Jamie Oberle',
                role: 'Orell Füssli, Leiter e-Business',
                sentence: 'Taskbase brilliert mit Kompetenz, Herzlichkeit und fortschrittlichster Technologie.'
            },
            {
                pic: this.buildPicUrl('urs.png'),
                name: 'Urs Zellweger\n',
                role: 'Lehrer, Kantonsschule Stans',
                sentence: 'Die Plattform acadilly.com von Taskbase ist die einzige Schweizer Lernplattform' +
                    ' die technologisch international mithalten kann.'
            }
        ];
    }
    TestimonialsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var counter = 0;
        var iterateWhileUntouched = function () {
            if (!_this.touched) {
                _this.activeTestimonial = counter++ % _this.testimonials.length;
                setTimeout(function () {
                    iterateWhileUntouched();
                }, 2500);
            }
        };
        iterateWhileUntouched();
    };
    TestimonialsComponent.prototype.setActiveTestimonial = function (val) {
        this.touched = true;
        this.activeTestimonial = (val >= 0) ? val % this.testimonials.length : this.testimonials.length - 1;
    };
    TestimonialsComponent.prototype.buildPicUrl = function (logo) {
        return "assets/img/testimonial/" + logo;
    };
    TestimonialsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-testimonials',
            template: __webpack_require__("../../../../../src/app/landing/testimonials/testimonials.component.html"),
            styles: [__webpack_require__("../../../../../src/app/landing/testimonials/testimonials.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TestimonialsComponent);
    return TestimonialsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/navbar/menu-items/menu-items.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"menu-items\" [ngStyle]=\"style\">\n  <li *ngFor=\"let menuItem of menuItems\" class=\"menu-item\">\n    <a mat-button color=\"primary\" [routerLink]=\"menuItem.link\" [ngStyle]=\"buttonStyle\">\n      {{menuItem.title}}\n    </a>\n  </li>\n</ul>\n"

/***/ }),

/***/ "../../../../../src/app/navbar/menu-items/menu-items.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".menu-items {\n  list-style-type: none;\n  display: -ms-flexbox;\n  display: flex;\n  margin: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navbar/menu-items/menu-items.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuItemsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuItemsComponent = (function () {
    function MenuItemsComponent() {
        this.menuItems = [{
                link: 'team',
                title: 'Team'
            }, {
                link: 'blog',
                title: 'Blog'
            }];
    }
    MenuItemsComponent.prototype.ngOnChanges = function () {
        // TODO: Use CSS instead of ngStyle
        this.style = {
            'flex-direction': this.alignment === 'vertical' ? 'column' : 'row'
        };
        this.buttonStyle = {};
        if (this.alignment === 'vertical') {
            this.buttonStyle.width = '100%';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], MenuItemsComponent.prototype, "alignment", void 0);
    MenuItemsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-menu-items',
            template: __webpack_require__("../../../../../src/app/navbar/menu-items/menu-items.component.html"),
            styles: [__webpack_require__("../../../../../src/app/navbar/menu-items/menu-items.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MenuItemsComponent);
    return MenuItemsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- TODO-FIVERR1: Navbar should be really sticky and shouldn't move around -->\n<div class=\"navbar\">\n  <div class=\"navbar-left\">\n    <a class=\"navbar-button logo-image-wrapper\" routerLink=\"/\">\n      <img src=\"assets/img/logos/taskbase.svg\"\n           class=\"logo-image\"\n           alt=\"\">\n    </a>\n  </div>\n  <div class=\"navbar-middle\">\n    <!-- nothing here yet -->\n  </div>\n  <div class=\"navbar-right\">\n    <div class=\"tablet-and-desktop-menu\">\n      <app-menu-items></app-menu-items>\n    </div>\n    <div class=\"mobile-menu\">\n      <button mat-raised-button (click)=\"sidenavState.open = !sidenavState.open\" color=\"primary\">\n        <i class=\"fa fa-bars\"></i>\n      </button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  background: #FFFFFF;\n  color: #000000; }\n\n:host {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05); }\n\n.navbar {\n  font-size: 16px;\n  min-height: 50px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  margin: 0 20px; }\n  .navbar .navbar-left {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-pack: center;\n        justify-content: center; }\n    .navbar .navbar-left .logo-image-wrapper {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n          align-items: center; }\n      .navbar .navbar-left .logo-image-wrapper .logo-image {\n        height: 30px; }\n  .navbar .navbar-middle {\n    -ms-flex-positive: 1;\n        flex-grow: 1;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-pack: center;\n        justify-content: center; }\n  .navbar .navbar-right {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-pack: center;\n        justify-content: center; }\n    @media (max-width: 599px) {\n      .navbar .navbar-right .tablet-and-desktop-menu {\n        display: none; } }\n    @media (min-width: 600px) {\n      .navbar .navbar-right .mobile-menu {\n        display: none; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidenav_service__ = __webpack_require__("../../../../../src/app/sidenav.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavbarComponent = (function () {
    function NavbarComponent(sidenavService) {
        this.sidenavService = sidenavService;
        this.sidenavState = this.sidenavService.sidenavState;
    }
    NavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-navbar',
            template: __webpack_require__("../../../../../src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/navbar/navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sidenav_service__["a" /* SidenavService */]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  Page not found.\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-page-not-found',
            template: __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "../../../../../src/app/routing/routes.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export appRoutes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__landing_landing_component__ = __webpack_require__("../../../../../src/app/landing/landing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__impressum_impressum_component__ = __webpack_require__("../../../../../src/app/impressum/impressum.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__blog_blog_blog_component__ = __webpack_require__("../../../../../src/app/blog/blog/blog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__team_team_component__ = __webpack_require__("../../../../../src/app/team/team.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__landing_landing_component__["a" /* LandingComponent */] },
    { path: 'impressum', component: __WEBPACK_IMPORTED_MODULE_4__impressum_impressum_component__["a" /* ImpressumComponent */] },
    { path: 'blog', component: __WEBPACK_IMPORTED_MODULE_5__blog_blog_blog_component__["a" /* BlogComponent */] },
    { path: 'team', component: __WEBPACK_IMPORTED_MODULE_6__team_team_component__["a" /* TeamPageComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_3__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */]
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/sidenav.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidenavService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SidenavService = (function () {
    function SidenavService() {
        this.sidenavState = {
            open: false
        };
    }
    SidenavService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
    ], SidenavService);
    return SidenavService;
}());



/***/ }),

/***/ "../../../../../src/app/team/business-card/business-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"business-card\">\n  <div class=\"card-header\"></div>\n  <div class=\"card-body\">\n    <img src=\"{{teamMember.pic}}\"\n         class=\"pic\"\n         alt=\"\">\n    <h3 class=\"name\">\n      {{teamMember.name}}\n    </h3>\n    <div class=\"description\">\n      {{teamMember.description}}\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/team/business-card/business-card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".business-card .card-header {\n  background-image: linear-gradient(to bottom right, #009688, #2CBFA2);\n  color: white; }\n\n.business-card {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  border-radius: 3px; }\n  .business-card .card-header {\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px;\n    width: 100%;\n    height: 90px; }\n  .business-card .card-body {\n    margin-top: -60px;\n    text-align: center; }\n    .business-card .card-body .pic {\n      width: 100px;\n      height: 100px;\n      border-radius: 50%;\n      border: 6px solid rgba(255, 255, 255, 0.7); }\n    .business-card .card-body .name {\n      font-size: 20px;\n      color: #009688;\n      margin: 0; }\n    .business-card .card-body .description {\n      margin-bottom: 30px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/team/business-card/business-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BusinessCardComponent = (function () {
    function BusinessCardComponent() {
    }
    BusinessCardComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], BusinessCardComponent.prototype, "teamMember", void 0);
    BusinessCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-business-card',
            template: __webpack_require__("../../../../../src/app/team/business-card/business-card.component.html"),
            styles: [__webpack_require__("../../../../../src/app/team/business-card/business-card.component.scss")],
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
        }),
        __metadata("design:paramtypes", [])
    ], BusinessCardComponent);
    return BusinessCardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/team/team.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbo\">\n  <div class=\"jumbo-content\">\n    <div class=\"content-part-1\">\n      Wir bauen\n    </div>\n    <div class=\"content-part-2\">\n      die besten Lernsyteme.\n    </div>\n  </div>\n</div>\n<div class=\"team-page-content\">\n  <h1>\n    Das Team\n  </h1>\n  <ul class=\"team-member-list\">\n    <li *ngFor=\"let teamMember of teamMembers\" class=\"team-member-list-item\">\n      <app-business-card [teamMember]=\"teamMember\"></app-business-card>\n    </li>\n  </ul>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/team/team.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".jumbo {\n  background-image: linear-gradient(to bottom right, #009688, #2CBFA2);\n  color: white; }\n\n.jumbo {\n  height: 300px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center; }\n  .jumbo .jumbo-content {\n    text-align: center;\n    font-size: 35px; }\n    .jumbo .jumbo-content .content-part-2 {\n      font-weight: bold; }\n\n.team-page-content {\n  max-width: 900px;\n  margin: 0 auto;\n  text-align: center; }\n  .team-page-content .team-member-list {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n    -ms-flex-pack: distribute;\n        justify-content: space-around; }\n    .team-page-content .team-member-list .team-member-list-item {\n      width: 400px;\n      max-width: 100%;\n      margin: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/team/team.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TeamPageComponent = (function () {
    function TeamPageComponent() {
        this.teamMembers = [{
                name: 'Samuel Portmann',
                pic: this.getPicUrl('samuel.png'),
                description: 'Business Development'
            }, {
                name: 'Jost Joller',
                pic: this.getPicUrl('jost.png'),
                description: 'Software Development'
            }, {
                name: 'Daniel Niederberger',
                pic: this.getPicUrl('daniel.png'),
                description: 'Software Development'
            }];
    }
    TeamPageComponent.prototype.ngOnInit = function () {
    };
    TeamPageComponent.prototype.getPicUrl = function (picEndpoint) {
        return "assets/img/team/" + picEndpoint;
    };
    TeamPageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-team-page',
            template: __webpack_require__("../../../../../src/app/team/team.component.html"),
            styles: [__webpack_require__("../../../../../src/app/team/team.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TeamPageComponent);
    return TeamPageComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map