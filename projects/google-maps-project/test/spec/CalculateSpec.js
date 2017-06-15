describe("Calculate", function() {
  it("should be able to calculate the distance", function(done) {
    $( "#a1-input" ).autocomplete( "search", "a" );
    $( "#a2-input" ).autocomplete( "search", "a" );

    function cb() {
      $( "#a1-input" ).data("ui-autocomplete").menu.element.c‌​hildren().first().cl‌​ick()
      $("#a2-input").data("ui-autocomplete").menu.element.c‌​hildren().second().cl‌​ick()

      $( "#calc-button" ).click();

      var distance = $( "#distance" ).text();

      expect(distance).toEqual(21);
      done();
    }

    setTimeout(cb, 3000)
  });

  afterEach(function() {
    myNS.calculate.reset();
  });
});
