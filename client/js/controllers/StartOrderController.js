define([ './module' ], function (controllers) {
    'use strict';
    controllers.controller('StartOrderController', [ '$scope', 'BeurrageNet', '$location', function ($, BN, $location) {
        function buildSuggestions() {
            var today = new Date();
            $.suggestedNames = [];
            for(var i = 1; i < 9; i++) {
                $.suggestedNames.push(new Date(today.getTime() + 24 * 60 * 60 * 1000 * i).toDateString());
            }
        }

        $.customers = BN.getCustomers();
        $.selectCustomer = function (customer) {
            if($.selectedCustomer === customer) {
                delete $.selectedCustomer;
            } else {
                $.selectedCustomer = customer;
            }

            buildSuggestions();
        };

        $.types = BN.getOrderTypes();
        $.selectType = function (type) {
            if($.selectedType === type) {
                delete $.selectedType;
            } else {
                $.selectedType = type;
            }

            buildSuggestions();
        };

        $.start = function () {
            BN.startOrder($.selectedCustomer.id, $.selectedType.id, $.name, function (order) {
                $location.path('/orders/' + order.id);
            });
        };

        $.setName = function (name) {
            $.name = name;
        };
    } ]);
});