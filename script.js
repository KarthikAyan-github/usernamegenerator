

function generateUsername(firstname, lastname, middlename, dob, emojis, emoji, nickname, hobbies, interests) {
  let fields = [];
  if (firstname) fields.push(firstname);
  if (lastname) fields.push(lastname);
  if (middlename) fields.push(middlename);
  if (emojis) fields.push(emojis);
  if (emoji) fields.push(emoji);
  if (nickname) fields.push(nickname);
  if (hobbies) fields.push(hobbies);
  if (interests) fields.push(interests);

  let selectedFields = [];
  if (fields.length > 4) {
    while (selectedFields.length < 4) {
      let index = Math.floor(Math.random() * fields.length);
      if (!selectedFields.includes(fields[index])) {
        selectedFields.push(fields[index]);
      }
    }
  } else {
    selectedFields = fields;
  }

  let parts = selectedFields.concat(dob.split('-'));
  for (let i = parts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [parts[i], parts[j]] = [parts[j], parts[i]];
  }
  let username = parts.join('').toLowerCase();
  if (Math.random() < 0.2) {
    let specialChars = ['.', '_'];
    let randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    let randomNumber = Math.floor(Math.random() * 100);
    username = username + randomChar + randomNumber;
  }
  return username;
}


// Function to generate 20 random usernames based on the user inputs and display them on the html page
function generateUsernames() {
  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let middlename = document.getElementById('middlename').value;
  let dob = document.getElementById('dob').value;
  let emoji = document.getElementById('emoji').value;
  let emojis = document.getElementById('emojis').value;
  let nickname = document.getElementById('nickname').value;
  let hobbies = document.getElementById('hobbies').value;
  let interests = document.getElementById('interests').value;
  
  if (firstname === "" || dob === "") {
    alert("Please fill out all mandatory fields!");
    return;
  }

  let usernames = [];
  for (let i = 0; i < 20; i++) {
    let username = generateUsername(firstname, lastname, middlename, dob, emojis, emoji, nickname, hobbies, interests);
    usernames.push(username);
  }

  let usernamesDiv = document.getElementById('usernames');
  usernamesDiv.innerHTML = '<strong>Here are some unique and catchy username options:</strong>';
  for (let i = 0; i < usernames.length; i++) {
    let usernameDiv = document.createElement('div');
    usernameDiv.innerHTML = usernames[i];
    let copyButton = document.createElement('button');
	copyButton.id = 'cbtnId';
    copyButton.innerHTML = 'Copy';
    copyButton.addEventListener('click', function() {
      copyToClipboard(usernames[i]);
    });
    usernameDiv.appendChild(copyButton);
    usernamesDiv.appendChild(usernameDiv);
  }

  let generateMoreButton = document.createElement('button');
  generateMoreButton.id = 'mbtnId';
  generateMoreButton.classList.add('mBtn');
  generateMoreButton.innerHTML = 'Generate More';
  generateMoreButton.addEventListener('click', function() {
    generateUsernames();
  });
  usernamesDiv.appendChild(generateMoreButton);
}


// Function to copy the generated username to the clipboard
function copyToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
  alert(text +' is copied to clipboard..😉');
}



// Call the generateUsernames function when the "Generate" button is clicked
document.getElementById("generateButton").addEventListener("click", function() {
  generateUsernames();
});
