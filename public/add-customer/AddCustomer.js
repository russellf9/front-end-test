(function () {
    angular.module('qudini.QueueApp')
        .directive('addCustomer', AddCustomer);


    function AddCustomer($http){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];
                // the function to add a new customer
                scope.addCustomer = function(customer){
                    // test validity of the customer
                    if(!customer.name || !customer.product) {
                        console.log('error');
                        // TODO implement error handling
                    } else {
                        $http.post('/api/customer/add', customer).then(function(res) {
                            scope.onAdded()(); // note double parenthesis
                        });
                    }
                }
            }
        };
    }


})();



