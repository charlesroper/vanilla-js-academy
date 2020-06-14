var h2s = Array.from(document.querySelectorAll("h2"));
var fragment = new DocumentFragment();

h2s.forEach(function(h2) {
  var link = document.createElement("a");
  link.href = "#" + h2.id;
  link.innerText = h2.innerText;

  var listItem = document.createElement("li");
  listItem.appendChild(link);

  fragment.appendChild(listItem);
});

var list = document.createElement("ul");
list.appendChild(fragment);
document.getElementById("table-of-contents").appendChild(list);
