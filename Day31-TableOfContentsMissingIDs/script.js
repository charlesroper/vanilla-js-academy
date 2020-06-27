var h2s = Array.from(document.querySelectorAll("h2"));
var fragment = new DocumentFragment();

h2s.forEach(function(h2) {
  var a = document.createElement("a");
  var regex = /[\s'"]+/gm;

  if (!h2.id) h2.id = h2.innerText.replace(regex, "-");

  a.href = "#" + h2.id;
  a.innerText = h2.innerText;

  var li = document.createElement("li");
  li.appendChild(a);

  fragment.appendChild(li);
});

var ul = document.createElement("ul");
ul.appendChild(fragment);
document.getElementById("table-of-contents").appendChild(ul);
