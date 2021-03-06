Rule = function(name, description, value)
{
    let self =
        {
            name:name,
            description:description,
            value:value
        };

        self.enact = function(player)
        {
            player.score(self.value);
            $("#enactRuleModal").modal('hide');
        };
        return self;
};

RuleLog = function(rule, players)
{
    let self =
        {
            rule: rule,
            players: players
        };
    return self;
};

populateRuleList = function()
{
    let rules = global.activeLeague.rules;
    let ruleNumber = rules.length;
    let html = "";

    for(let i = 0; i < rules.length; i++)
    {
        html += "<button type = button class = \"list-group-item list-group-item-action\" data-toggle=\"modal\" data-target=\"#ruleViewModal\" data-rNo = '"+i+"' + onClick='getRule(this.getAttribute(\"data-rNo\"))'>" +
            rules[i].name +"</button>\n"
    }
    $("#RuleScroll").html(html);
};

newRule = function()
{
    let name = $("#rlName").val();
    let disc = $("#rlDisc").val();
    let value = $("#rlVal").val();
    global.activeLeague.rules.push(Rule(name, disc, value));
    $("#newRuleModal").modal('hide');
    save();
    populateRuleList();
    $("#rlName").val("");
    $("#rlDisc").val("");
    $("#rlVal").val("");
};

getRule = function(rNo)
{
    let rule = global.activeLeague.rules[rNo];
    $("#ruleViewModal").attr("data-rNo",rNo);
    $("#RuleTitle").html(rule.name);
    $("#RuleDisc").html(rule.description);
    $("#RuleVal").html(rule.value);

};

rEditPrep = function(rNo)
{
    $("#ruleViewModal").modal('hide');
    $('#editRuleModal').modal('show');
    $('#editRuleModal').attr('data-rNo', rNo);
    let rule = global.activeLeague.rules[rNo];
    $("#rlNameEd").val(rule.name);
    $("#rlValEd").val(rule.value);
    $("#rlDiscEd").val(rule.description);

};

editRuleSave = function(rNo)
{
    global.activeLeague.rules[rNo]=  Rule($("#rlNameEd").val(), $("#rlDiscEd").val(), $("#rlValEd").val());
    $('#editRuleModal').modal('hide');
    save();
    populateRuleList();
};

let enactSelected = [];

enactPrep = function(rNo)
{
    $('#ruleViewModal').modal('hide');
    $('#enactRuleModal').modal('show');
    $('#enactRuleModal').attr('data-rNo', rNo);
    enactSelected = [];

    //Add players to dropdown
    let players = global.activeLeague.players;
    let playerNumber = players.length;
    let html = "";

    for(let i = 0; i < players.length; i++)
    {
        html += "<div class = 'btn-group-toggle '  onclick='enactSelect(" + i + ")' data-toggle ='buttons'>";
        html += "<label class = 'btn btn-outline-success list-group-item list-group-item-action noCorner'>";
        html += "<input type = 'checkbox' checked autocomplete='off' value = '" + i +"'/>" + players[i].name + "</label>";
        html += "</div>"
    }
    $("#targetPl").append(html);
};

enactSelect = function(pNo)
{
    if(!enactSelected.includes(pNo))
    {
        enactSelected.push(pNo);
    }
    else
    {
        enactSelected.splice(enactSelected.indexOf(pNo), 1)
    }
};

enactOnSelected = function(rNo)
{
  enactSelected.forEach(function(pNo)
  {
   global.activeLeague.rules[rNo].enact(global.activeLeague.players[pNo])
  });
};

removeRule = function(rNo)
{
 global.activeLeague.rules.splice(rNo,1);
 $("#ruleViewModal").modal('hide');
 save();
 populateRuleList();
};
