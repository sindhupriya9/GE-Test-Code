var grid = angular.module('Grid', []);

grid.controller('masterTable', function ($scope) {
    $scope.masterObj = [];
    $scope.dataObj = [];
    $scope.lableArray = ['checkbox'];
    $scope.jsonObj = [];
    $scope.modalShown = false;
    $scope.addShown = false;
    $scope.date = new Date();

    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.init = function () {
        var obj = [{
            checkbox: true,
            name: 'Number',
            type: 'number',
            editable: true
        }, {
            checkbox: true,
            name: 'String',
            type: 'text',
            editable: true
        }, {
            checkbox: true,
            name: 'Date',
            type: 'date',
            editable: true
        }, {
            checkbox: true,
            name: 'Select',
            type: 'select',
            editable: true
        }]

        $scope.masterObj = obj;
        angular.forEach($scope.masterObj, function (value, key) {
            $scope.lableArray.push(value.name);
        });
    }

    $scope.addColumn = function (name, type, editable) {
        var obj = {
            checkbox: false,
            name: name,
            type: type,
            editable: editable
        }
        $scope.masterObj.push(obj);
        $scope.lableArray = ['checkbox'];
        angular.forEach($scope.masterObj, function (value, key) {
            $scope.lableArray.push(value.name);
        });
        $scope.modalShown = false;
        //$scope.addRow();
    }

    $scope.removeColumn = function () {
        var newObj = [];
        angular.forEach($scope.masterObj, function (value, key) {
            if (!value.checkbox) {
                newObj.push(value);
            }
        });
        $scope.masterObj = newObj;
    }

    $scope.hideModal = function () {
        $scope.modalShown = false;
    };

    $scope.addRow = function () {
        //$('tr#parentEle').hide();
        $('tr#parentEle').hide();
        $('tr#parentEle:not(:nth-child(1))').remove();
        $scope.addShown = true;
        var row = [];
        row.push({
            type: 'checkbox',
            model: 'checkbox'
        });
        angular.forEach($scope.masterObj, function (value, key) {
            row.push({
                type: value.type,
                model: value.name
            });
        });
        $scope.dataObj.push(row);
    };

    $scope.deleteRow = function () {
        var newObj = [];
        angular.forEach($scope.jsonObj, function (value, key) {
            if (!value[0].value) {
                newObj.push(value);
            }
        });
        $scope.jsonObj = newObj;
    };

    $scope.addRecord = function () {
        var obj = [];
        var data = $('#parentEle:last-child').find('td').find('input,select').map(function () {
            switch ($(this).attr('type')) {
            case 'checkbox':
                var ele = {};
                ele["value"] = $(this).prop("checked") ? true : false;
                ele["element"] = $(this).attr('data-colname').toLowerCase();
                ele["index"] = $(this).prop('id');
                obj.push(ele);
                break;
            case 'date':
                var ele = {};
                ele["value"] = $(this).val(); //.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1")
                ele['element'] = $(this).attr('data-colname').toLowerCase();
                ele['index'] = $(this).prop('id');
                obj.push(ele);
                break;
            case 'text':
                var ele = {};
                ele["value"] = $(this).val();
                ele['element'] = $(this).attr('data-colname').toLowerCase();
                ele['index'] = $(this).prop('id');
                obj.push(ele);
                break;
            case 'number':
                var ele = {};
                ele["value"] = $(this).val();
                ele['element'] = $(this).attr('data-colname').toLowerCase();
                ele['index'] = $(this).prop('id');
                obj.push(ele);
                break;
            default:
                var ele = {};
                ele["value"] = $(this).val();
                ele['element'] = $(this).attr('data-colname').toLowerCase();
                ele['index'] = $(this).prop('id');
                obj.push(ele);
            }
            return true;
        }).get();
        $scope.addShown = false;
        $scope.jsonObj.push(obj);
    };

    $scope.export = function () {
        if ($scope.jsonObj.length > 0) {
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($scope.jsonObj));
            var a = window.document.createElement('a');
            a.href = "data:" + data;
            a.download = 'data.json';
            document.body.appendChild(a)
            a.click();
            document.body.removeChild(a)
        } else {
            alert("No data exported");
        }
    };

    $scope.editRecord = function (obj, classEle) {
        angular.forEach(obj, function (val, idx) {
            switch ($('.' + idx).eq(classEle).attr('element')) {
            case 'checkbox':
                if($('.' + idx).eq(classEle).text().trim() == "true"){
                    $('.' + idx).eq(classEle).html('<input type="checkbox" class="update'+classEle+'" checked/>');
                }else{
                    $('.' + idx).eq(classEle).html('<input type="checkbox" class="update'+classEle+'"/>');
                }
                break;
            case 'date':
                $('.' + idx).eq(classEle).html('<input type="date" class="update'+classEle+'" value="' + $('.' + idx).eq(classEle).text().trim() + '"/>');
                break;
            case 'string':
                $('.' + idx).eq(classEle).html('<input type="text" class="update'+classEle+'" value="' + $('.' + idx).eq(classEle).text().trim() + '"/>');
                break;
            case 'number':
                $('.' + idx).eq(classEle).html('<input type="number" class="update'+classEle+'" value="' + $('.' + idx).eq(classEle).text().trim() + '"/>');
                break;
            default:
                if ($('.' + idx).eq(classEle).text().trim() == "true") {
                    $('.' + idx).eq(classEle).html('<select class="update'+classEle+'"><option value="">Dropdown</option>' + '<option value="true" selected>Yes</option><option value="false" >No</option></select>');
                } else {
                    $('.' + idx).eq(classEle).html('<select class="update'+classEle+'"><option value="">Dropdown</option>' + '<option value="true">Yes</option><option value="false" selected>No</option></select>');
                }
            }
        });
    }

    $scope.normalRecord = function (index) {
        $(".update"+index).map(function () {
            if($(this).attr('type') == "checkbox"){
                if($(this).prop("checked")){
                    $(this).html('<input type="checkbox" class="update'+index+'" checked/>');
                }else{
                    $(this).html('<input type="checkbox" class="update'+index+'"/>');
                }
            } else{
                $(this).parent('td').html($(this).val());
            }  
        }).get();
    }
    
    $scope.updateRecord = function (data, index) {
        var newObj = [];
        var record = $(".update"+index).map(function () {
            if($(this).attr('type') == "checkbox"){
                return $(this).prop("checked") ? true : false;
            } else{
                return $(this).val();
            }
        }).get();
        angular.forEach(data, function (val, key) {
            val.value = record[key];
        });
        $scope.jsonObj[index] = data;
        $scope.normalRecord(index);
    }

    $scope.init();
});

grid.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height / 2;
            scope.hideModal = function () {
                scope.show = false;
            };
        },
        template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
    };
});