(function() {

var app = angular.module('parafocus', []);

// imagine this comes from a markdown parser
var paras = [
  "This is a reading experiment intended to make it easier to focus on paragraphs, while being able to add context. This is the first paragraph in the example text. It currently doesn't work on mobile, so if you are reading this on a mobile device please come back when you're on a browser hooked to a keyboard. To go to the next paragraph, use the right arrow key.",
  "You can go back to the previous paragraph using the left arrow key. Try moving back to the previous paragraph with the left arrow key, and then back here with the right arrow key. Once you've done this, proceed to the paragraph after this one by hitting the right arrow key.",
  "This is just like a normal slide show, like you'll find with Excel. The extra thing this interface supports is viewing a previous paragraph without leaving this one. This might be useful if you need to remember what the previous paragraph said in order to understand the current paragraph. To view the previous paragraph without leaving this paragraph, use the up arrow key. You can press it again to see three paragraphs. Afterward you can hit the bottom arrow key to hide the above paragraphs. Then go right to see the next paragraph.",
  "You can also use the bottom arrow key to show the next paragraph. The up and down arrow keys don't change the current page.",
  "Thanks for trying this! Please leave feedback on twitter by mentioning @benatkin or on github at https://github.com/benatkin/parafocus."
];

app.controller('ParaFocusCtrl', ['$scope', function($scope) {
  var extra = 0;
  $scope.paras = paras;
  $scope.current = 0;
  $scope.start = 0;
  $scope.end = 0;
  $scope.keydown = function(event) {
    function clamp(n, min, max) {
      return n < min ? min : (n > max ? max : n);
    }

    var keys = { 37: '<', 39: '>', 38: '^', 40: 'v' };
    var dir = keys[event.which];

    if (dir == '>') {
      $scope.current = clamp($scope.current + 1, 0, paras.length - 1);
      extra = 0;
    } else if (dir == '<') {
      $scope.current = clamp($scope.current - 1, 0, paras.length - 1);
      extra = 0;
    } else if (dir == '^') {
      extra = clamp(extra - 1, 0 - $scope.current, paras.length - 1 - $scope.current);
    } else if (dir == 'v') {
      extra = clamp(extra + 1, 0 - $scope.current, paras.length - 1 - $scope.current);
    }
    if (typeof dir !== 'undefined') event.preventDefault();
    $scope.start = $scope.current + (extra < 0 ? extra : 0);
    $scope.end = $scope.current + (extra > 0 ? extra : 0);
  }
}]);

})();
