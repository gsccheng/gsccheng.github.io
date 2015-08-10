window.onload = function() {
  // Populate form
  var mandarinSpeakers = document.getElementsByName('mandarin')[0];
  var cantoneseSpeakers = document.getElementsByName('cantonese')[0];
  var exco = document.getElementsByName('exco')[0];
  var sgLeaders = document.getElementsByName('sg-leaders')[0];
  var presentRecruits = document.getElementsByName('present-recruits')[0];
  var absentRecruits = document.getElementsByName('absent-recruits')[0];

  mandarinSpeakers.innerHTML = seedCreator(7, 'Mandarin');
  cantoneseSpeakers.innerHTML = seedCreator(7, 'Cantonese');
  exco.innerHTML = "Gabriel Cheng&#13;&#10;Kristen Siu&#13;&#10;Michael Cheng&#13;&#10;Kelvin Leung&#13;&#10;Andy Kang&#13;&#10;John Ng&#13;&#10;Richard Chen&#13;&#10;James Yu&#13;&#10;Shanmei Kuang&#13;&#10;Anthony Vong&#13;&#10;Melissa Kuo";
  sgLeaders.innerHTML = seedCreator(10, 'Small Group Leader');
  presentRecruits.innerHTML = seedCreator(29, 'Present Recruit');
  absentRecruits.innerHTML = seedCreator(39, 'Absent Recruit');

  function seedCreator(numSeeds, seedText) {
    var seeds = '';
    for (i = 1; i < numSeeds; i++) {
      seeds = seeds + seedText + ' ' + i + '&#13;&#10;';
    }
    seeds = seeds + seedText + ' ' + numSeeds;
    return seeds;
  };
}

function generateAll() {
  if (document.getElementById('inner-results').innerHTML) {
    document.getElementById('inner-results').innerHTML = '';
  }

  var utils = {
    shuffle: function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },
    splitArrEvenly: function splitArrEvenly(arr, numSubsets) {
      var len = arr.length, dividedArr = [], i = 0;
      while (i < len) {
        var size = Math.ceil((len - i) / numSubsets--);
        dividedArr.push(arr.slice(i, i += size));
      }
      return dividedArr;
    },
    dupTeamTemplate: function dupTeamTemplate() {
      var team = document.getElementById('template').cloneNode(true);
      team.style.display = 'inline-block';
      team.id = '';
      return team;
    },
    appendToOrderedList: function appendToOrderedList(team, camper, orderedListIndex) {
      lineItem = document.createElement('li');
      lineItem.innerHTML = camper;

      orderedListParent = team.querySelectorAll('ol')[orderedListIndex];
      orderedListParent.appendChild(lineItem);
    }
  }

  // clears results if already populated

  generateChineseTeam('Team Alpha', 'Anne Wang', 'mandarin');
  generateChineseTeam('Team Bravo', 'Cantonese Leader', 'cantonese');

  var teamNames = ['Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima'];
  var numGroupsToDivide = teamNames.length

  var exco = document.getElementsByName('exco')[0].value.split("\n");
  var sgLeaders = document.getElementsByName('sg-leaders')[0].value.split("\n");
  var absentRecruits = document.getElementsByName('absent-recruits')[0].value.split("\n");
  var presentRecruits = document.getElementsByName('present-recruits')[0].value.split("\n");

  [exco, sgLeaders, absentRecruits, presentRecruits].map(function(group) {
    // remove any blank lines at the end of the array
    if (group[group.length-1] == '') {
      group.pop();
    }
    utils.shuffle(group);
  })

  var dividedAbsentArr = utils.splitArrEvenly(absentRecruits, numGroupsToDivide);
  var dividedPresentArr = utils.splitArrEvenly(presentRecruits, numGroupsToDivide);
  var dividedExcoArr = utils.splitArrEvenly(exco, numGroupsToDivide)

  teamNames.forEach(createTeam)

  function createTeam(teamName, index) {
    var team =  utils.dupTeamTemplate();

    team.querySelectorAll('h4')[0].innerHTML = 'Team ' + teamName;

    if (!sgLeaders[index]) {sgLeaders[index] = 'No Small Group Leader'};
    team.querySelectorAll('span')[0].innerHTML = sgLeaders[index];

    team.querySelectorAll('h5')[1].innerHTML = 'Present Recruits:';
    team.querySelectorAll('h5')[2].innerHTML = 'Absent Recruits:';
    team.querySelectorAll('h5')[3].innerHTML = 'Exco:';

    // Populate members from end of array
    dividedPresentArr[numGroupsToDivide - index - 1].map(function(recruit) {
      utils.appendToOrderedList(team, recruit, 0)
    })

    if (!dividedExcoArr[index]) {dividedExcoArr.push(['No Exco Member'])};
    dividedExcoArr[index].map(function(exco) {
      utils.appendToOrderedList(team, exco, 2)
    })

    // Populate members from beginning of array for balance
    if (!dividedAbsentArr[index]) {dividedAbsentArr.push(['No Absent Recruit'])};

    dividedAbsentArr[index].map(function(recruit) {
      utils.appendToOrderedList(team, recruit, 1)
    })

    var parentNode = document.getElementById('inner-results');
    parentNode.appendChild(team);
  }

  function generateChineseTeam(teamName, sgl, classNameOfData) {

    var team = utils.dupTeamTemplate();

    team.querySelectorAll('h4')[0].innerHTML = teamName;
    team.querySelectorAll('span')[0].innerHTML = sgl;

    var speakers = document.getElementsByName(classNameOfData)[0].innerHTML;
    var speakerArr = speakers.split("\n");

    speakerArr.map(function(speaker) {
      utils.appendToOrderedList(team, speaker, 0)
    })

    var parentNode = document.getElementById('inner-results');
    parentNode.appendChild(team);
  }

}
