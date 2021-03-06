define([ './module' ], function (services) {
    'use strict';

    var SB = '/services/v1/';

    services.service('MSApi', [ '$http', function ($http) {
        var api = {

            setAuthToken: function (authToken) {
                $http.defaults.headers.common['MS-Auth-Token'] = authToken;
            },

            clearAuthToken: function () {
                delete $http.defaults.headers.common['MS-Auth-Token'];
            },

            getProducts: function MSApiGetProducts (options, cb) {
                var products = [],
                    o = _.isPlainObject(options) ? options : {},
                    c = _.isFunction(options) ? options : (_.isFunction(cb) ? cb : function () {});

                $http({ method: 'GET', url: SB + 'products?'
                    + (!o.productGroupId && !o.notAsGroups ? 'asGroups=true' : '')
                    + (o.orderId ? ('&forOrderId=' + o.orderId) : '')
                    + (o.productGroupId ? ('&inProductGroupId=' + o.productGroupId) : '') }).
                    success(function(data, status, headers, config) {
                        _.extend(products, data);
                        c(products);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(products, data);
                        c(products);
                    });

                return products;
            },

            getProductGroups: function MSApiGetProductGroups (cb) {
                var productGroups = [],
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'GET', url: SB + 'products/groups' }).
                    success(function(data, status, headers, config) {
                        _.extend(productGroups, data);
                        c(productGroups);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(productGroups, data);
                        c(productGroups);
                    });

                return productGroups;
            },

            getProductGroupById: function MSApiGetProductGroupById (productGroupId, cb) {
                var productGroup = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'GET', url: SB + 'products/groups/' + productGroupId }).
                    success(function(data, status, headers, config) {
                        _.extend(productGroup, data);
                        c(productGroup);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(productGroup, data);
                        c(productGroup);
                    });

                return productGroup;
            },

            addProductGroup: function MSApiAddProductGroup (newProductGroup, cb) {
                var productGroup = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'POST', url: SB + 'products/groups/', data: newProductGroup }).
                    success(function(data, status, headers, config) {
                        _.extend(productGroup, data);
                        c(productGroup);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(productGroup, data);
                        c(productGroup);
                    });

                return productGroup;
            },

            updateProductGroup: function MSApiUpdateProductGroup (productGroupId, mods, cb) {
                var productGroup = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'PATCH', url: SB + 'products/groups/' + productGroupId, data: mods }).
                    success(function(data, status, headers, config) {
                        _.extend(productGroup, data);
                        c(productGroup);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(productGroup, data);
                        c(productGroup);
                    });

                return productGroup;
            },

            getProductById: function MSApiGetProductById (productId, cb) {
                var product = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'GET', url: SB + 'products/' + productId }).
                    success(function(data, status, headers, config) {
                        _.extend(product, data);
                        c(product);
                    }).
                    error(function(data, status, headers, config) {

                    });

                return product;
            },

            addProduct: function MSApiAddProduct (newProduct, cb) {
                var product = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'POST', url: SB + 'products', data: newProduct }).
                    success(function(data, status, headers, config) {
                        _.extend(product, data);
                        c(product);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(product, data);
                        c(product);
                    });

                return product;
            },

            updateProduct: function MSApiUpdateProduct (productId, mods, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    product = {
                        loading: true
                    };

                $http({ method: 'PATCH', url: SB + 'products/' + productId, data: mods }).
                    success(function(data, status, headers, config) {
                        delete product.loading;
                        _.extend(product, data);
                        c(product);
                    }).
                    error(function(data, status, headers, config) {
                        delete product.loading;
                        _.extend(product, data);
                        c(product);
                    });

                return product;
            },

            getUnits: function MSApiGetUnits (cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    units = [];

                $http({ method: 'GET', url: SB + 'units' }).
                    success(function(data, status, headers, config) {
                        _.extend(units, data);
                        c(units);
                    }).
                    error(function(data, status, headers, config) {

                    });

                return units;
            },

            getProductPrices: function MSApiGetProductPrices (productId, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    prices = [];

                $http({ method: 'GET', url: SB + 'products/' + productId + '/prices' }).
                    success(function(data, status, headers, config) {
                        _.extend(prices, data);
                        c(prices);
                    }).
                    error(function(data, status, headers, config) {

                    });

                return prices;
            },

            addProductPrice: function MSApiAddProductPrice (productId, pp, cb) {
                var productPrice = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'POST', url: SB + 'products/' + productId + '/prices', data: pp }).
                    success(function(data, status, headers, config) {
                        _.extend(productPrice, data);
                        c(productPrice);
                    }).
                    error(function(data, status, headers, config) {

                    });

                return productPrice;
            },

            updateProductPrice: function MSApiAddProductPrice (productId, priceId, unitPrice, cb) {
                var productPrice = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'PATCH', url: SB + 'products/' + productId + '/prices/' + priceId, data: { unitPrice: unitPrice } }).
                    success(function(data, status, headers, config) {
                        _.extend(productPrice, data);
                        c(productPrice);
                    }).
                    error(function(data, status, headers, config) {

                    });

                return productPrice;
            },

            getCustomers: function MSApiGetCustomers (cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    customers = [];

                $http({ method: 'GET', url: SB + 'customers' }).
                    success(function(data, status, headers, config) {
                        _.extend(customers, data);
                        c(customers);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(customers, data);
                        c(customers);
                    });

                return customers;
            },

            getCustomerById: function MSApiGetCustomerById (customerId, cb) {
                var customer = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'GET', url: SB + 'customers/' + customerId }).
                    success(function(data, status, headers, config) {
                        _.extend(customer, data);
                        c(customer);
                    }).
                    error(function(data, status, headers, config) {

                    });

                return customer;
            },

            addCustomer: function MSApiAddCustomer (newCustomer, cb) {
                var customer = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'POST', url: SB + 'customers', data: newCustomer }).
                    success(function(data, status, headers, config) {
                        _.extend(customer, data);
                        c(customer);
                    }).
                    error(function(data, status, headers, config) {

                    });

                return customer;
            },

            updateCustomer: function MSApiUpdateCustomer (customerId, mods, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    customer = {
                        loading: true
                    };

                $http({ method: 'PATCH', url: SB + 'customers/' + customerId, data: mods }).
                    success(function(data, status, headers, config) {
                        delete customer.loading;
                        _.extend(customer, data);
                        c(customer);
                    }).
                    error(function(data, status, headers, config) {
                        delete customer.loading;
                        _.extend(customer, data);
                        c(customer);
                    });

                return customer;
            },

            startOrder: function MSApiStartOrder (customerId, typeId, name, cb) {
                var order = {
                    loading: true
                };

                $http({ method: 'POST', url: SB + 'orders/', data: { customerId: customerId, typeId: typeId, name: name } }).
                    success(function(data, status, headers, config) {
                        delete order.loading;
                        _.extend(order, data);

                        order.createdTimestamp = new Date(order.createdTimestamp);
                        order.modifiedTimestamp = new Date(order.modifiedTimestamp);

                        if(_.isFunction(cb)) {
                            cb(order);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        delete order.loading;
                        _.extend(order, data);

                        if(_.isFunction(cb)) {
                            cb(order);
                        }
                    });

                return order;
            },

            getOrders: function MSApiGetOrders (p0, p1) {
                var c = _.isFunction(p0) ? p0 : (_.isFunction(p1) ? p1 : function () {}),
                    limits = _.isPlainObject(p0) ? p0 : {},
                    orders = [];

                $http({ method: 'GET', url: SB + 'orders', params: limits }).
                    success(function(data, status, headers, config) {
                        _.extend(orders, data);

                        _.forEach(orders, function (order) {
                            order.createdTimestamp = new Date(order.createdTimestamp);
                            order.modifiedTimestamp = new Date(order.modifiedTimestamp);
                        });

                        c(orders);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(orders, data);
                        c(orders);
                    });

                return orders;
            },

            getOrderTypes: function MSApiGetOrderTypes (cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    orderTypes = [];

                $http({ method: 'GET', url: SB + 'orders/types' }).
                    success(function(data, status, headers, config) {
                        _.extend(orderTypes, data);
                        c(orderTypes);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(orderTypes, data);
                        c(orderTypes);
                    });

                return orderTypes;
            },

            getOrderById: function MSApiGetOrderById (orderId, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    order = {
                        loading: true
                    };

                $http({ method: 'GET', url: SB + 'orders/' + orderId }).
                    success(function(data, status, headers, config) {
                        delete order.loading;
                        _.extend(order, data);

                        order.createdTimestamp = new Date(order.createdTimestamp);
                        order.modifiedTimestamp = new Date(order.modifiedTimestamp);
                        c(order);
                    }).
                    error(function(data, status, headers, config) {
                        delete order.loading;
                        _.extend(order, data);
                        c(order);
                    });

                return order;
            },

            addOrderItem: function MSApiAddOrderItem (orderId, productId, quantity, cb) {
                var order = {};

                $http({ method: 'POST', url: SB + 'orders/' + orderId + '/items', data: { productId: productId, quantity: quantity } }).
                    success(function(data, status, headers, config) {
                        _.extend(order, data);

                        if(_.isFunction(cb)) {
                            cb(order);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(order, data);

                        if(_.isFunction(cb)) {
                            cb(order);
                        }
                    });

                return order;
            },

            updateOrderItemQuantity: function MSApiUpdateOrderItemQuantity (orderId, itemId, newQuantity, cb) {
                var order = {};

                $http({ method: 'PATCH', url: SB + 'orders/' + orderId + '/items/' + itemId, data: { quantity: newQuantity } }).
                    success(function(data, status, headers, config) {
                        _.extend(order, data);

                        order.createdTimestamp = new Date(order.createdTimestamp);
                        order.modifiedTimestamp = new Date(order.modifiedTimestamp);

                        if(_.isFunction(cb)) {
                            cb(order);
                        }
                    }).
                    error(function(data, status, headers, config) {

                    });

                return order;
            },

            updateOrder: function MSApiUpdateOrder (orderId, mods, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    order = {
                        loading: true
                    };

                $http({ method: 'PATCH', url: SB + 'orders/' + orderId, data: mods }).
                    success(function(data, status, headers, config) {
                        delete order.loading;
                        _.extend(order, data);

                        order.createdTimestamp = new Date(order.createdTimestamp);
                        order.modifiedTimestamp = new Date(order.modifiedTimestamp);
                        c(order);
                    }).
                    error(function(data, status, headers, config) {
                        delete order.loading;
                        _.extend(order, data);
                        c(order);
                    });

                return order;
            },

            getInvoices: function MSApiGetInvoices (cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    invoices = [];

                $http({ method: 'GET', url: SB + 'invoices' }).
                    success(function(data, status, headers, config) {
                        _.extend(invoices, data);

                        _.forEach(invoices, function (invoice) {
                            invoice.createdTimestamp = new Date(invoice.createdTimestamp);
                            invoice.modifiedTimestamp = new Date(invoice.modifiedTimestamp);
                        });

                        c(invoices);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(invoices, data);
                        c(invoices);
                    });

                return invoices;
            },

            getInvoiceById: function MSApiGetInvoiceById (invoiceId, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    invoice = {
                        loading: true
                    };

                $http({ method: 'GET', url: SB + 'invoices/' + invoiceId }).
                    success(function(data, status, headers, config) {
                        delete invoice.loading;
                        _.extend(invoice, data);

                        invoice.createdTimestamp = new Date(invoice.createdTimestamp);
                        invoice.modifiedTimestamp = new Date(invoice.modifiedTimestamp);

                        _.forEach(invoice.orders, function (order) {
                            order.createdTimestamp = new Date(order.createdTimestamp);
                            order.modifiedTimestamp = new Date(order.modifiedTimestamp);
                        });

                        c(invoice);
                    }).
                    error(function(data, status, headers, config) {
                        delete invoice.loading;
                        _.extend(invoice, data);
                        c(invoice);
                    });

                return invoice;
            },

            startInvoice: function MSApiStartOrder (billToInfo, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    invoice = {
                        loading: true
                    };

                $http({ method: 'POST', url: SB + 'invoices', data: billToInfo }).
                    success(function(data, status, headers, config) {
                        delete invoice.loading;
                        _.extend(invoice, data);
                        invoice.createdTimestamp = new Date(invoice.createdTimestamp);
                        invoice.modifiedTimestamp = new Date(invoice.modifiedTimestamp);
                        c(invoice);
                    }).
                    error(function(data, status, headers, config) {
                        delete invoice.loading;
                        _.extend(invoice, data);
                        c(invoice);
                    });

                return invoice;
            },

            addInvoiceOrders: function MSApiAddInvoiceOrders (invoiceId, orders, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    res = {};

                $http({ method: 'POST', url: SB + 'invoices/' + invoiceId + '/orders', data: orders }).
                    success(function(data, status, headers, config) {
                        _.extend(res, data);
                        c(res);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(orders, data);
                        c(res);
                    });

                return res;
            },

            removeInvoiceOrder: function MSApiRemoveInvoiceOrder (invoiceId, orderId, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    res = {};

                $http({ method: 'DELETE', url: SB + 'invoices/' + invoiceId + '/orders/' + orderId }).
                    success(function(data, status, headers, config) {
                        _.extend(res, data);

                        _.forEach(res.orders, function (order) {
                            order.createdTimestamp = new Date(order.createdTimestamp);
                            order.modifiedTimestamp = new Date(order.modifiedTimestamp);
                        });

                        c(res);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(res, data);
                        c(res);
                    });

                return res;
            },

            updateInvoice: function MSApiUpdateInvoice (invoiceId, mods, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    invoice = {
                        loading: true
                    };

                $http({ method: 'PATCH', url: SB + 'invoices/' + invoiceId, data: mods })
                    .success(function(data, status, headers, config) {
                        delete invoice.loading;
                        _.extend(invoice, data);

                        invoice.createdTimestamp = new Date(invoice.createdTimestamp);
                        invoice.modifiedTimestamp = new Date(invoice.modifiedTimestamp);
                        c(invoice);
                    })
                    .error(function(data, status, headers, config) {
                        delete invoice.loading;
                        _.extend(invoice, data);
                        c(invoice);
                    });

                return invoice;
            },

            sendInvoice: function MSApiUpdateInvoice (invoiceId, cb) {
                var c = _.isFunction(cb) ? cb : function () {},
                    sendAck = {
                        loading: true
                    };

                $http({ method: 'GET', url: SB + 'sendInvoice?invoiceId=' + invoiceId })
                    .success(function(data, status, headers, config) {
                        delete sendAck.loading;
                        _.extend(sendAck, data);

                        c(sendAck);
                    })
                    .error(function(data, status, headers, config) {
                        delete sendAck.loading;
                        _.extend(sendAck, data);
                        c(sendAck);
                    });

                return sendAck;
            },

            getAdjustmentById: function MSApiGetAdjustmentById (invoiceId, adjustmentId, cb) {
                var adj = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'GET', url: SB + 'invoices/' +invoiceId + '/adjustments/' + adjustmentId }).
                    success(function(data, status, headers, config) {
                        _.extend(adj, data);
                        c(adj);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(adj, data);
                        c(adj);
                    });

                return adj;
            },

            createAuthentication: function MSApiServiceCreateAuthentication (email, password, name, cb) {
                var auth = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'POST', url: SB + 'authentications', data: { email: email, password: password, name: name } }).
                    success(function(data, status, headers, config) {
                        _.extend(auth, data);
                        c(auth);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(auth, data);
                        c(auth);
                    });

                return auth;
            },

            deleteAuthentication: function MSApiServiceDeleteAuthentication (authId, cb) {
                var auth = {},
                    c = _.isFunction(cb) ? cb : function () {};

                $http({ method: 'DELETE', url: SB + 'authentications/' + authId }).
                    success(function(data, status, headers, config) {
                        _.extend(auth, data);
                        c(auth);
                    }).
                    error(function(data, status, headers, config) {
                        _.extend(auth, data);
                        c(auth);
                    });
            }
        };

        return api;
    } ]);
});