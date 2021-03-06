League = function(name, description)
{
    let self =
        {
            name:name,
            description:description,
            teams:[],
            players:[],
            events: [],
            leagueTeams: []
        };

    self.addTeam = function(name)
    {
        self.teams.push(Team(name));
    };

    self.addPlayer = function(name, img)
    {
        self.players.push(Player(name, img))
    };

    self.save = function()
    {
      localStorage.setItem(self.name, JSON.stringify(self));
    };

    return self;
};

newLeague = function()
{
    let league = League($("#leagueNameField").val(), $("#leagueDescriptionField").val());
    league.save();
    global = league;
    $("#newLeagueModal").modal('hide');
    window.location.replace("#!dashboard");
};

loadLeague = function(name)
{
    load(name);
    $("#loadLeagueModal").modal('hide');
    window.location.replace("#!dashboard");
};

populateLeagueList = function()
{
    let html = "";

    let keys =  Object.keys(localStorage);
    keys.forEach(function(key)
    {
        html += "<button type='button' class='list-group-item list-group-item-active' onclick='loadLeague(\""+key+"\")'>"+key+"</button>";
    });

    $("#leagueList").html(html);
};