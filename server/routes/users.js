var db = require('../db'),
    _ = require('lodash');

module.exports = {
    create: function createUser (req, res) {
        if(_.isPlainObject(req.body) || _.isArray(req.body)) {
            db.createUser('', req.body, function (err, result) {
                if(err) {
                    res.send(400, {
                        error: err
                    });
                } else {
                    var response = [];

                    _.forEach(_.isArray(result) ? result : [ result ], function (rA) {
                        var result = rA.length === 1 ? null : rA[1],
                            error = rA[0];

                        if(result) {
                            response.push({
                                id: result.insertId,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                email: result.email,
                                address: result.address,
                                phoneNumber: 'phoneNumber' in result ? result.phoneNumber : undefined
                            });
                        } else {
                            response.push({
                                error: error
                            });
                        }
                    });

                    res.send(201, response.length === 1 ? response[0] : response);
                }
            });
        }
    }
};

/*
 * GET users listing.
 */

//exports.list = function(req, res){
//  res.send({
//      one: 1,
//      two: '2',
//      three: [ 3, '3' ]
//  });
//};