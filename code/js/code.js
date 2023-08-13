$(function () {

  const parsedUrl = new URL(window.location.href);
  var id = parsedUrl.searchParams.get("id");

  var $formSave = $("#formSave");
  var mode = $("#mode").val();
  var changed = false;

  var curorientationMode = null;
  var prevOrientationMode = null;

  var mode_automatic = 1
  var mode_horizontal = 2
  var mode_vertical = 3
  var mode_null = 0;

  var modeOrientation = mode_automatic;
  var curOrientation = mode_null;

  function setOrientation(mode) {
    var width, height;
    modeOrientation = mode;

    if (modeOrientation == mode_horizontal) {
      curOrientation = mode;
    } else if (modeOrientation == mode_vertical) {
      curOrientation = mode;
    } else {

      width = $(window).width();
      height = $(window).height();

      if (width >= height) {
        curOrientation = mode_vertical;
      } else {
        curOrientation = mode_horizontal;
      }
    }

    if (curOrientation == mode_horizontal) {
      document.getElementById("textareacontainer").style.height = "50%";
      document.getElementById("iframecontainer").style.height = "50%";
      document.getElementById("textareacontainer").style.width = "100%";
      document.getElementById("iframecontainer").style.width = "100%";
    } else if (curOrientation == mode_vertical) {
      document.getElementById("textareacontainer").style.height = "100%";
      document.getElementById("iframecontainer").style.height = "100%";
      document.getElementById("textareacontainer").style.width = "50%";
      document.getElementById("iframecontainer").style.width = "50%";
    }
  }

  // Define an extended mixed-mode that understands vbscript and
  // leaves mustache/handlebars embedded templates in html mode
  var editor = CodeMirror.fromTextArea(document.getElementById("textareaCode"), {
    mode: {
      name: "htmlmixed",
      scriptTypes: [{
        matches: /\/x-handlebars-template|\/x-mustache/i,
        mode: null
      }, {
        matches: /(text|application)\/(x-)?vb(a|script)/i,
        mode: "vbscript"
      }]
    },
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "default"
  });

  if (isMobile()) {
    editor.setOption("lineNumbers", false);
  }

  function showResult() {
    document.getElementById("iframewrapper").innerHTML = "";

    var text = editor.getDoc().getValue();
    if (text === undefined || text === null) {
      return;
    }

    text = text.trim();

    if (typeof (text) == "string" && text.length > 0) {
      var ifr = document.createElement("iframe");
      ifr.setAttribute("frameborder", "0");
      ifr.setAttribute("id", "iframeResult");
      document.getElementById("iframewrapper").appendChild(ifr);
      var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
      ifrw.document.open();
      ifrw.document.write(text);
      ifrw.document.close();
    }
  }

  function resizeEditor() {
    if (modeOrientation == mode_automatic) {
      if (!isAndroid()) {
        setOrientation(modeOrientation); // 안드로이드가 아닌 경우
      } else {
        // 안드로이드의 경우 오리엔테이션이 달라진 경우만 체크
        if (prevOrientationMode != curOrientationMode) {
          setOrientation(modeOrientation);
          prevOrientationMode = curOrientationMode;
        }
      }
    }
    editor.setSize($('.textareawrapper').width(), $('.textareawrapper').height());
  };

  $(window).resize(resizeEditor);
  $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', resizeEditor);

  // mobile orientation change
  function orientationChange() {
    curOrientationMode = doOnOrientationChange();
  };
  // listen for orientation change
  window.onorientationchange = orientationChange;

  // set initially
  orientationChange();
  resizeEditor();

  // 홈으로
  $("#btnGoHome").on("click", function (e) {
    location.href = "/";
  });

  // 화면 전환
  $("#btnReStack").on("click", function (e) {
    if (curOrientation == mode_vertical) {
      setOrientation(mode_horizontal);
    } else {
      setOrientation(mode_vertical);
    }
    resizeEditor();
  });

  // 결과보기
  $("#btnRun").on("click", function (e) {
    showResult();
  });

  if (id != null) {

    let url;
    if (id instanceof Number) {
      url = "/codes/" + id;
    } else if (id.startsWith("/")) {
      url = id + ".html";
    }
    if (url) {
      $.ajaxRest({
        url: url,
        type: "GET",
        success: function (data) {
          editor.setValue(data);
  
          showResult();
        },
        beforeError: function (jqXHR, textStatus, errorThrown) {
          if (jqXHR.status == 404) {
            return errorMsgHandler.notFoundPage();
          }
        }
      });
    }
  } else {
    editor.setValue($("#templateSample").html());
  }

  editor.on("change", function (cm, change) {
    changed = true;
  });
  showResult();

  var leavePageController = null;
  if (mode == "edit") {
    leavePageController = $("#textareacontainer").leavePageController();
    leavePageController.init();
  }
});
