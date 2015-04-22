(function () {

    angular.module('qudini.QueueApp', ['qudini.customer'])
        .controller('QueueCtrl', QueueCtrl);


    /**
     * Bonus points - manipulating the without waiting for the
     * server request
     */
    function QueueCtrl($scope, $http, CustomerService) {

        $scope.customers = [];
        $scope.customersServed = [];
        _getCustomers();
        _getServedCustomers();

        $scope.onCustomerAdded = function(){
            _getCustomers();
        }

        $scope.onCustomerRemoved = function(){
            _getCustomers();
        }

        $scope.onCustomerServed = function(){
            _getCustomers();
            _getServedCustomers()
        }

        function _getServedCustomers(){
            return $http.get('/api/customers/served').then(function(res){
                $scope.customersServed = res.data;
            })
        }

        function _getCustomers(){
            return $http.get('/api/customers').then(function(res){
                $scope.customers = res.data;
            })
        }

        $scope.service = CustomerService;

        // using a watch on change here rather than listening to the dispatching events
        $scope.$watch('service.getData()', function(newVal, oldVal) {
            if(newVal && newVal !== oldVal) {
                _getCustomers();
            }
        });
    }


})();


