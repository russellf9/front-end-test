(function () {
    angular.module('qudini.customer')
        .service('CustomerService', function($rootScope, $http) {

            var _data = 0;

            return {
                // the call to add the new customer
                addCustomer : function(customer) {
                    _addCustomer(customer);
                },

                //
                serveCustomer: function(customer) {
                    _serveCustomer(customer);
                },
                // a quick fix so the Service can be watched
                getData : function() {
                    return _data;
                }
            };

            // the hack way to change the data property being watched
            function _increment() {
                _data = _data + 1;
            }

            // makes the server side call to add new customer
            function _addCustomer(customer) {
                return $http.post('api/customer/add', customer).then(function(res){
                    // test success
                    if(res.hasOwnProperty('status') && res.status === 200) {
                        _increment();
                    }
                })
            }


            function _serveCustomer(customer) {
                return $http.post('/api/customer/serve', customer).then(function(res){
                    // test success
                    if(res.hasOwnProperty('status') && res.status === 200) {
                        _increment();
                    }
                })
            }
        });
})();
