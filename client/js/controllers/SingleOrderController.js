define([ './module' ], function (controllers) {
    'use strict';
    controllers.controller('SingleOrderController', [
        '$scope', 'MSApi', '$routeParams', '$location', '$timeout', '$window',
        function ($, MSApi, $routeParams, $location, $timeout, $window) {
            $.from = $routeParams.from;
            $.order = MSApi.getOrderById($routeParams.orderId);

            $.itemCountText = function () {
                if($.order.itemCount === 0) {
                    return 'no items';
                } else if($.order.itemCount === 1) {
                    return '1 item';
                } else {
                    return $.order.itemCount + ' items';
                }
            };

            var p = null;

            $.itemQtyChange = function (item, immediate) {
                $timeout.cancel(p);

                var f = function () {
                    MSApi.updateOrderItemQuantity($.order.id, item.id, item.quantity, function (order) {
                        $.order = order;
                    });
                };

                if(immediate) {
                    f();
                } else {
                    p = $timeout(f, 2500);
                }
            };

            $.complete = function () {
                MSApi.updateOrder($.order.id, { statusId: 2 }, function (order) {
                    angular.extend($.order, order);
                    $.confirmComplete = false;
                });
            };

            $.removeItem = function (item) {
                MSApi.updateOrderItemQuantity($.order.id, item.id, 0, function (order) {
                    $.order = order;
                });
            };

            $.selectItem = function (item) {
                if($.selectedItem === item) {
                    delete $.selectedItem;
                } else {
                    $.selectedItem = item;
                }
            };

            $.clearSelectedItem = function () {
                delete $.selectedItem;
            };
    } ]);
});