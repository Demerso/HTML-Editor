function getMenuHeight() {
  var menuHeight = document.getElementById("menu").offsetHeight;
  return menuHeight;
}

function getPageWidth() {
  var menuWidth = document.getElementById("menu").offsetWidth;
  return menuWidth;
}

function getPageHeight() {
  var pageHeight = window.innerHeight;
  return pageHeight;
}

function jump(anchor) {
  var top = document.getElementById(anchor).offsetTop;
  window.scrollTo({ top: top - getMenuHeight() - 5, behavior: "smooth" });
}

function showPopup(popup) {
  const popups = ["login", "options"];
  var popupDiv = document.getElementById(popup);
  popupDiv.style.left = getPageWidth() - popupDiv.offsetWidth + "px";
  popups.forEach(function(id) {
    if (id == popup) {
      if (popupDiv.style.visibility == "visible") {
        popupDiv.style.visibility = "hidden";
        popupDiv.style.opacity = 0;
      } else {
        popupDiv.style.visibility = "visible";
        popupDiv.style.opacity = 1;
      }
    } else {
      var hiddenPopup = document.getElementById(id);
      hiddenPopup.style.visibility = "hidden";
      hiddenPopup.style.opacity = 0;
    }
  });
}

function togglePassword(form) {
  var passIn = document.forms[form]["pass"];
  var showPass = document.forms[form]["showPass"];
  var passIcon = showPass.parentElement;
  if (showPass.checked) {
    passIn.type = "text";
    passIcon.style.backgroundImage = "url('img/eye-on.svg')";
  } else {
    passIn.type = "password";
    passIcon.style.backgroundImage = "url('img/eye-off.svg')";
  }
}

function deleteCookie(cookie) {
  document.cookie = cookie + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  location.reload();
}

function updatePage() {
  var result = document.getElementById("result");
  var code = document.getElementById("code").children[0];
  result.contentWindow.document.open();
  result.contentWindow.document.write(code.innerText);
  result.contentWindow.document.close();
  document.cookie = "html_code=" + encodeURIComponent(code.innerText) + ";";
}

function exportCode(fileName = "index.html", type = "text/plain") {
  const a = document.createElement("a");
  var code = document.getElementById("code").children[0].innerText;
  a.style.display = "none";
  document.body.appendChild(a);
  a.href = window.URL.createObjectURL(new Blob([code], { type }));
  a.setAttribute("download", fileName);
  a.click();
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

function testCode() {
  const form = document.createElement("form");
  form.method = "post";
  form.action = "http://validator.w3.org/check";
  form.enctype = "multipart/form-data";
  form.target = "_blank";
  form.style.display = "none";

  const field = document.createElement("input");
  field.style.display = "none";
  field.type = "textarea";
  field.name = "fragment";
  field.value = document.getElementById("code").children[0].innerText;
  form.appendChild(field);
  document.body.appendChild(form);

  form.submit();

  form.remove();
}

function saveCode() {
  const form = document.createElement("form");
  form.method = "post";
  form.action = "save.php";
  form.enctype = "multipart/form-data";
  form.style.display = "none";

  const field = document.createElement("input");
  field.style.display = "none";
  field.type = "textarea";
  field.name = "code";
  field.value = encodeURIComponent(
    document.getElementById("code").children[0].innerText
  );
  form.appendChild(field);
  document.body.appendChild(form);

  form.submit();

  form.remove();
}

function loadCode() {
  location.replace("load.php");
}

window.onload = function() {
  document.getElementById("page").style.marginTop = getMenuHeight() + 5 + "px";
  document.getElementById("login").style.top = getMenuHeight() + 5 + "px";
  document.getElementById("options").style.top = getMenuHeight() + 5 + "px";
  document.getElementById("code").style.height =
    getPageHeight() - getMenuHeight() + "px";
  document.getElementById("result").style.height =
    getPageHeight() - getMenuHeight() + "px";
  var code = document.getElementById("code").children[0];
  if (document.cookie.search("html_code") == -1) {
    code.innerText = `<!DOCTYPE html>\n<html lang="en">\n <head>\n  <title>Page</title>\n </head>\n <body>\n\n </body>\n</html>`;
    document.cookie = "html_code=" + encodeURIComponent(code.innerText) + ";";
  } else {
    var html_code = /html_code\=([^\;]+)/i.exec(document.cookie);
    if (html_code) {
      code.innerText = decodeURIComponent(html_code[1]);
    } else {
      code.innerText = `<!DOCTYPE html>\n<html lang="en">\n <head>\n  <title>Page</title>\n </head>\n <body>\n\n </body>\n</html>`;
    }
  }
  updatePage();
  code.contentEditable = true;

  code.onkeydown = function(key) {
    if (key.keyCode === 9) {
      key.preventDefault();
      var doc = code.ownerDocument.defaultView;
      var sel = doc.getSelection();
      var range = sel.getRangeAt(0);
      var tabNode = document.createTextNode(" ");
      range.insertNode(tabNode);
      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
};

window.onresize = function() {
  document.getElementById("page").style.marginTop = getMenuHeight() + 5 + "px";
  document.getElementById("login").style.top = getMenuHeight() + 5 + "px";
  document.getElementById("options").style.top = getMenuHeight() + 5 + "px";
  document.getElementById("code").style.height =
    getPageHeight() - getMenuHeight() + "px";
  document.getElementById("result").style.height =
    getPageHeight() - getMenuHeight() + "px";
};
