'use strict';
(function () {
    angular
        .module('resizeToolBox', [])
        .controller('ResizeToolBoxController', resizeToolBoxCtrl);

    function resizeToolBoxCtrl ($scope, $rootScope, $mdBottomSheet) {
        $scope.units = [
            {value: 'b', label: 'Bytes'},
            {value: 'kb', label: 'Kilobytes'},
            {value: 'mb', label: 'Megabytes'},
            {value: 'gb', label: 'Gigabytes'}
        ];

        $scope.resize = function () {
            if ($scope.resizeForm.$invalid) { return; }

            if ($scope.unit || $scope.size) {
                $rootScope.$emit('resizeImgOctet', $scope.unit, $scope.size);
            }
            else {
                $rootScope.$emit('resizeImg', $scope.width, $scope.height);
            }
            $mdBottomSheet.hide();
        };
    }
})();
