function myShowTheMessage(msgid) {
  $('#msg_body').contents().find('html').html("");
  togglePanes("#msgpane");
  showRightButtons();
  var scope = getInboxCtrl();
  msgid = encodeURIComponent(msgid);
  // adds omitted row to fix error
  scope.showing_msg = msgid;
  var parms = "msgid=" + msgid + "&zone=" + scope.getCurrentZone();
  var url1 = "/fetch_email?" + parms;
  $.ajax({url: url1})
    .done(function(data) {
      var err = data['error'];
      if (err) {
          togglePanes("#inboxpane");
          showStatusError("", err);
          return;
        }
        currentEmail = data['data'];
        analyzeEmail(currentEmail);
        showPart(bestpartname);
        var scope = getInboxCtrl();
        scope.$apply(function() {
          scope.setMsg(currentEmail);
        });
    })
    .fail(function(data) {
      console.log(data);
    });
}

// replaces broken function with working
showTheMessage = myShowTheMessage;