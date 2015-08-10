window.onload = function() {
  // Populate form
  var mandarinSpeakers = document.getElementsByName('mandarin')[0];
  mandarinSpeakers.innerHTML = "Mandarin 1&#13;&#10;Mandarin 2&#13;&#10;Mandarin 3&#13;&#10;Mandarin 4&#13;&#10;Mandarin 5&#13;&#10;Mandarin 6&#13;&#10;Mandarin 7";

  var cantoneseSpeakers = document.getElementsByName('cantonese')[0];
  cantoneseSpeakers.innerHTML = "Cantonese 1&#13;&#10;Cantonese 2&#13;&#10;Cantonese 3&#13;&#10;Cantonese 4&#13;&#10;Cantonese 5&#13;&#10;Cantonese 6&#13;&#10;Cantonese 7";

  var exco = document.getElementsByName('exco')[0];
  exco.innerHTML = "Gabriel Cheng&#13;&#10;Kristen Siu&#13;&#10;Michael Cheng&#13;&#10;Kelvin Leung&#13;&#10;Andy Kang&#13;&#10;John Ng&#13;&#10;Richard Chen&#13;&#10;James Yu&#13;&#10;Shanmei Kuang&#13;&#10;Anthony Vong&#13;&#10;Melissa Kuo";

  var exco = document.getElementsByName('exco')[0];
  exco.innerHTML = "Gabriel Cheng&#13;&#10;Kristen Siu&#13;&#10;Michael Cheng&#13;&#10;Kelvin Leung&#13;&#10;Andy Kang&#13;&#10;John Ng&#13;&#10;Richard Chen&#13;&#10;James Yu&#13;&#10;Shanmei Kuang&#13;&#10;Anthony Vong&#13;&#10;Melissa Kuo";

  var sgLeaders = document.getElementsByName('sg-leaders')[0];
  sgLeaders.innerHTML = "Small Group Leader 1&#13;&#10;Small Group Leader 2&#13;&#10;Small Group Leader 3&#13;&#10;Small Group Leader 4&#13;&#10;Small Group Leader 5&#13;&#10;Small Group Leader 6&#13;&#10;Small Group Leader 7&#13;&#10;Small Group Leader 8&#13;&#10;Small Group Leader 9&#13;&#10;Small Group Leader 10&#13;&#10;Small Group Leader 11";

  var presentRecruits = document.getElementsByName('present-recruits')[0];
  presentRecruits.innerHTML = "Present Recruit 1&#13;&#10;Present Recruit 2&#13;&#10;Present Recruit 3&#13;&#10;Present Recruit 4&#13;&#10;Present Recruit 5&#13;&#10;Present Recruit 6&#13;&#10;Present Recruit 7&#13;&#10;Present Recruit 8&#13;&#10;Present Recruit 9&#13;&#10;Present Recruit 10&#13;&#10;Present Recruit 11&#13;&#10;Present Recruit 12&#13;&#10;Present Recruit 13&#13;&#10;Present Recruit 14&#13;&#10;Present Recruit 15&#13;&#10;Present Recruit 16&#13;&#10;Present Recruit 17&#13;&#10;Present Recruit 18&#13;&#10;Present Recruit 19&#13;&#10;Present Recruit 20&#13;&#10;Present Recruit 21&#13;&#10;Present Recruit 22&#13;&#10;Present Recruit 23&#13;&#10;Present Recruit 24&#13;&#10;Present Recruit 25&#13;&#10;Present Recruit 26&#13;&#10;Present Recruit 27&#13;&#10;Present Recruit 28&#13;&#10;Present Recruit 29&#13;&#10;Present Recruit 30&#13;&#10;Present Recruit 31&#13;&#10;Present Recruit 32&#13;&#10;Present Recruit 33&#13;&#10;Present Recruit 34&#13;&#10;Present Recruit 35&#13;&#10;Present Recruit 36&#13;&#10;Present Recruit 37&#13;&#10;Present Recruit 38&#13;&#10;Present Recruit 39&#13;&#10;Present Recruit 40&#13;&#10;Present Recruit 41&#13;&#10;Present Recruit 42&#13;&#10;Present Recruit 43&#13;&#10;Present Recruit 44&#13;&#10;Present Recruit 45&#13;&#10;Present Recruit 46&#13;&#10;Present Recruit 47&#13;&#10;Present Recruit 48&#13;&#10;Present Recruit 49";

  var absentRecruits = document.getElementsByName('absent-recruits')[0];
  absentRecruits.innerHTML = "Absent Recruit 1&#13;&#10;Absent Recruit 2&#13;&#10;Absent Recruit 3&#13;&#10;Absent Recruit 4&#13;&#10;Absent Recruit 5&#13;&#10;Absent Recruit 6&#13;&#10;Absent Recruit 7&#13;&#10;Absent Recruit 8&#13;&#10;Absent Recruit 9&#13;&#10;Absent Recruit 10&#13;&#10;Absent Recruit 11&#13;&#10;Absent Recruit 12&#13;&#10;Absent Recruit 13&#13;&#10;Absent Recruit 14&#13;&#10;Absent Recruit 15&#13;&#10;Absent Recruit 16&#13;&#10;Absent Recruit 17&#13;&#10;Absent Recruit 18&#13;&#10;Absent Recruit 19&#13;&#10;Absent Recruit 20&#13;&#10;Absent Recruit 21&#13;&#10;Absent Recruit 22&#13;&#10;Absent Recruit 23&#13;&#10;Absent Recruit 24&#13;&#10;Absent Recruit 25&#13;&#10;Absent Recruit 26&#13;&#10;Absent Recruit 27&#13;&#10;Absent Recruit 28&#13;&#10;Absent Recruit 29&#13;&#10;Absent Recruit 30&#13;&#10;Absent Recruit 31&#13;&#10;Absent Recruit 32&#13;&#10;Absent Recruit 33&#13;&#10;Absent Recruit 34&#13;&#10;Absent Recruit 35&#13;&#10;Absent Recruit 36&#13;&#10;Absent Recruit 37&#13;&#10;Absent Recruit 38&#13;&#10;Absent Recruit 39";
};

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function splitArrEvenly(arr, numSubsets) {
    var len = arr.length, dividedArr = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / numSubsets--);
        dividedArr.push(arr.slice(i, i += size));
    }
    return dividedArr;
}

function dupTeamTemplate() {
  var team = document.getElementById('template').cloneNode(true);
  team.style.display = 'inline-block';
  team.id = '';
  return team;
}

function generateMandarinTeam() {

  var team = dupTeamTemplate();

  team.querySelectorAll('h4')[0].innerHTML = "Team Alpha";
  team.querySelectorAll('span')[0].innerHTML = "Anne Wang";

  var mandarinSpeakers = document.getElementsByName('mandarin')[0].innerHTML;
  var mandarinSpeakerArr = mandarinSpeakers.split("\n");

  mandarinSpeakerArr.map(function(speaker) {
    lineItem = document.createElement('li');
    lineItem.innerHTML = speaker;

    orderedListParent = team.querySelectorAll('ol')[0];
    orderedListParent.appendChild(lineItem);
  })

  var parentNode = document.getElementById('inner-results');
  parentNode.appendChild(team);
}

function generateCantoneseTeam() {

  var team = dupTeamTemplate();

  team.querySelectorAll('h4')[0].innerHTML = "Team Bravo";
  team.querySelectorAll('span')[0].innerHTML = "Cantonese Leader";

  var cantoneseSpeakers = document.getElementsByName('cantonese')[0].innerHTML;
  var cantoneseSpeakerArr = cantoneseSpeakers.split("\n");

  cantoneseSpeakerArr.map(function(speaker) {
    lineItem = document.createElement('li');
    lineItem.innerHTML = speaker;

    orderedListParent = team.querySelectorAll('ol')[0];
    orderedListParent.appendChild(lineItem);
  })

  var parentNode = document.getElementById('inner-results');
  parentNode.appendChild(team);
}

function generateAll() {

  var teamNames = ['Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima'];
  var numGroupsToDivide = teamNames.length

  var excoArr, exco = document.getElementsByName('exco')[0].value;
  excoArr = exco.split("\n");

  var sgLeadersArr, sgLeaders = document.getElementsByName('sg-leaders')[0].value;
  sgLeadersArr = sgLeaders.split("\n");

  var absentRecruitsArr, absentRecruits = document.getElementsByName('absent-recruits')[0].value;
  absentRecruitsArr = absentRecruits.split("\n");

  var presentRecruitsArr, presentRecruits = document.getElementsByName('present-recruits')[0].value;
  presentRecruitsArr = presentRecruits.split("\n");


  // clears results if already populated
  if (document.getElementById('inner-results').innerHTML) {
    document.getElementById('inner-results').innerHTML = '';
  }

  generateMandarinTeam();
  generateCantoneseTeam();

  [excoArr, sgLeadersArr, absentRecruitsArr, presentRecruitsArr].map(function(list) {
    // remove any blank lines at the end of the array
    if (list[list.length-1] == '') {
      list.pop();
    }
    shuffle(list);
  })

  var dividedAbsentArr = splitArrEvenly(absentRecruitsArr, numGroupsToDivide);
  var dividedPresentArr = splitArrEvenly(presentRecruitsArr, numGroupsToDivide);
  var dividedExcoArr = splitArrEvenly(excoArr, numGroupsToDivide)

  function createTeam(teamName, index) {
    var team =  dupTeamTemplate();

    team.querySelectorAll('h4')[0].innerHTML = 'Team ' + teamName;

    if (!sgLeadersArr[index]) {sgLeadersArr[index] = 'No Small Group Leader'};
    team.querySelectorAll('span')[0].innerHTML = sgLeadersArr[index];

    team.querySelectorAll('h5')[1].innerHTML = 'Present Recruits:';
    team.querySelectorAll('h5')[2].innerHTML = 'Absent Recruits:';
    team.querySelectorAll('h5')[3].innerHTML = 'Exco:';

    // Populate members from beginning of array
    dividedPresentArr[index].map(function(recruit) {
      lineItem = document.createElement('li');
      lineItem.innerHTML = recruit;

      orderedListParent = team.querySelectorAll('ol')[0];
      orderedListParent.appendChild(lineItem);
    })

    if (!dividedExcoArr[index]) {dividedExcoArr.push(['No Exco Member'])};

    dividedExcoArr[index].map(function(exco) {
      lineItem = document.createElement('li');
      lineItem.innerHTML = exco;

      orderedListParent = team.querySelectorAll('ol')[2];
      orderedListParent.appendChild(lineItem);
    })

    // Populate members from end of array for balance
    dividedAbsentArr[numGroupsToDivide - index - 1].map(function(recruit) {
      lineItem = document.createElement('li');
      lineItem.innerHTML = recruit;

      orderedListParent = team.querySelectorAll('ol')[1];
      orderedListParent.appendChild(lineItem);
    })

    var parentNode = document.getElementById('inner-results');
    parentNode.appendChild(team);
  }

  teamNames.forEach(createTeam)

}
