function generateUsernames() {
  var name = document.getElementById("name").value;
  var nickname = document.getElementById("nickname").value;
  var birth_year = document.getElementById("birth_year").value;
  var interests = document.getElementById("interests").value;
  var hobbies = document.getElementById("hobbies").value;

  var special_character = document.getElementById("special_character").value;
  var emoji = document.getElementById("emoji").value;
  var emojis = document.getElementById("emojis").value;
  
  if (name === "" || nickname === "" || birth_year === "") {
    alert("Please fill out all mandatory fields!");
    return;
  }
  var input_str = name + special_character + nickname + birth_year + interests + emoji + emojis + hobbies;
  var variations = [];
  variations.push(input_str.toLowerCase());
  variations.push(input_str.toUpperCase());
  variations.push(input_str.charAt(0).toUpperCase() + input_str.slice(1));
  variations.push(input_str.split("").reverse().join(""));
  variations.push(input_str.replace(/a/g, "@"));
  variations.push(input_str.replace(/i/g, "!"));
  variations.push(input_str.replace(/s/g, "$"));
  variations.push(input_str.replace(/o/g, "0"));
  variations.push(input_str.replace(/e/g, "€"));
  variations.push(input_str.replace(/y/g, "¥"));
  variations.push(input_str.replace(/c/g, "©"));
  
  
  variations.push(input_str + emoji);
  variations.push(input_str + emojis);
  
  var usernames = [];
  var count = 0;
  while (usernames.length < 20 && count < 100) {
    var shuffled_variations = variations.slice();
    shuffled_variations.sort(function() { return 0.5 - Math.random() });
    var username = shuffled_variations.join("").slice(0, Math.floor(Math.random() * (input_str.length - 5 + 1)) + 5);
    if (!usernames.includes(username)) {
      usernames.push(username);
    }
    count++;
  }
  var usernames_str = "";
  if (usernames.length > 0) {
    usernames_str += "<strong>Here are some unique and catchy username options:</strong><br>";
    for (var i = 0; i < usernames.length; i++) {
      var username_html = usernames[i] + ' <button onclick="copyUsername(this)">Copy</button><br>';
      usernames_str += username_html;
    }
    usernames_str += '<br><button type="button" onclick="generateUsernames()">Generate More</button>';
  } else {
    usernames_str += "Sorry, we could not generate any unique and catchy usernames for you.";
  }
  document.getElementById("usernames").innerHTML = usernames_str;
}

function copyUsername(button) {
  var username = button.parentNode.firstChild.nodeValue.trim();
  var el = document.createElement('textarea');
  el.value = username;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert('Copied ' + username + ' to clipboard!');
}
