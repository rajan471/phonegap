var app = angular.module("instagramApp", []);

app.controller("instagramController", function ($http) {
    this.json = [];
    this.hastag1;
    this.hastag2;
    this.jsonUrl = "";
    this.ImageUser = [];
    this.data = [];
    this.images = [];
    var scope = this;
    this.nextPage = false;
    this.noImages = true;
    this.submit = function () {
        this.ImageUser = [];
        this.data = [];
        this.images = [];
        this.loaded = false;
        scope.jsonUrl = "https://api.instagram.com/v1/tags/" + this.hastag1 + "/media/recent?count=10000&access_token=1536185190.1fb234f.a2a4707e77804807be4b582d58ad4330";
        scope.init();
    };

    this.init = function () {
        $http.jsonp(scope.jsonUrl + "&callback=JSON_CALLBACK")
            .success(function (response) {
                scope.json = response;
                
                scope.data = scope.json.data;

                var i=0;

                angular.forEach(scope.data, function (value, key) {
                    var access = false;
                    angular.forEach(value.tags, function (v, k) {

                        if (angular.isUndefined(scope.hastag2) || scope.hastag2.length == 0) {
                            access = true;
                        }
                        else if (v == scope.hastag2) {
                            access = true;

                        }

                    });
                    if (access) {
                        if (value.type == "image") {
                            var data = {
                                "url": value.images.standard_resolution.url,
                                "username": "@" + value.user.username
                            };
                            scope.images.push(data);
                            i++;
                        }
                    }

                });
                if(i>0) {
                    scope.nextPage = true;
                    scope.noImages = true;
                }else{
                    scope.nextPage = false;
                    scope.noImages = false;
                }

            });

    };

    //init();

    this.next = function () {
        scope.jsonUrl = scope.jsonUrl + "&max_tag_id=" + scope.json.pagination.next_max_id;
        scope.init();

    }


});