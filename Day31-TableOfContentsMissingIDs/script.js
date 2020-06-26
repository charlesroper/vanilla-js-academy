var h2s = Array.from(document.querySelectorAll("h2"));
var fragment = new DocumentFragment();

h2s.forEach(function(h2) {
  var link = document.createElement("a");
  var regex = /[\s'"]+/gm;
  var id = h2.id === "" ? h2.innerHTML.replace(regex, "-") : h2.id;

  h2.id = id;
  link.href = "#" + id;
  link.innerText = h2.innerText;

  var listItem = document.createElement("li");
  listItem.appendChild(link);

  fragment.appendChild(listItem);
});

var list = document.createElement("ul");
list.appendChild(fragment);
document.getElementById("table-of-contents").appendChild(list);
