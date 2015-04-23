(function() {
    angular.module('qudini.customer', [])
        .directive('customer', Customer);

    /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
    function Customer($http) {

        return {
            restrict: 'E',
            scope: {
                customer: '=',
                onRemoved: '&',
                onServed: '&'
            },
            templateUrl: '/customer/customer.html',
            link: function(scope) {

                // TODO the queued time is not being refreshed so it would be good to do a live update of this value

                // calculate how long the customer has queued for
                var queuedTime = new Date() - new Date(scope.customer.joinedTime);

                // use Moment.js to help with displaying the waiting time
                scope.queuedTime = moment.duration(queuedTime);

                // removes the customer from the queue
                scope.remove = function() {
                    $http({
                        method: 'DELETE',
                        url: '/api/customer/remove',
                        params: {id: scope.customer.id}
                    }).then(function(res) {
                        scope.onRemoved()()
                    })
                };

                // serves the customer
                scope.serve = function() {
                    $http.post('/api/customer/serve', scope.customer).then(function(res) {
                        scope.onServed()(); // note double parenthesis
                    });
                }
            }
        }
    }

})();

