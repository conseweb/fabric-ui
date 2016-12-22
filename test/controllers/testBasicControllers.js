/**
 * 作者: bullub
 * 日期: 2016/12/18 19:16
 * 用途:
 */
"use strict";
describe("Test BasicControllers.js", function () {
    describe("test MainCtrl", function () {
        var $scope;
        var mainCtrlInstance;
        beforeEach(module("controllers"));
        // beforeEach(module("insp"));

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            mainCtrlInstance = $controller("MainCtrl", {$scope: $scope});
        }));


        it("test userName is 飞骐", function () {
            expect(mainCtrlInstance.userName).toBe("飞骐");

        });
    });

    describe("test XCtrl", function () {
        var $scope;
        var xCtrlInstance;
        beforeEach(module("controllers"));
        // beforeEach(module("insp"));

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            xCtrlInstance = $controller("XCtrl", {$scope: $scope});
        }));

        it("test title to be MyContacts", function () {
            expect($scope.title).toBe("My Contacts");

        });


    });

});