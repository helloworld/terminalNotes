Notes = new Meteor.Collection("notes");
Clients = new Meteor.Collection("clients");



if (Meteor.isClient) {

    Template.notesList.notes = function() {
        return Notes.find();
    }

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
    Router.map(function() {

        /////////////////////
        // CREATE NEW USER //
        /////////////////////
        this.route('createUser', {
            where: 'server',
            path: '/createUser/:username/:password',

            action: function() {
                var username = this.params.username;
                var password = CryptoJS.MD5(this.params.password).toString()

                if (Clients.fetch({
                        username: "username"
                    }).length == undefined) {
                    Clients.insert({
                        username: username,
                        auth: password
                    });
                    console.log("USER " + username + " CREATED");
                } else {
                    console.log(Clients.fetch({
                        username: "username"
                    }))
                    console.log("USER ALREADY EXISTS");
                }

                this.response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                this.response.end("User was successfully created");
            }
        });

        //////////////////
        // ADD NEW NOTE //
        //////////////////
        this.route('addNote', {
            where: 'server',
            path: '/createNote/:username/:password/:title/:text',

            action: function() {
                var username = this.params.username;
                var password = CryptoJS.MD5(this.params.password).toString()
                var title = this.params.title;
                var text = this.params.text;

                var currentClient = Clients.findOne({
                    username: username
                });
                if (currentClient.auth == password) {
                    var note = Notes.findOne({
                        userName: username,
                        title: title
                    });
                    if (note == undefined) {
                        Notes.insert({
                            userName: username,
                            title: title,
                            text: text
                        });
                        this.response.writeHead(200, {
                        'Content-Type': 'text/html'
                        });
                        this.response.end("New note " + title + " successfully created");
                    } else {
                        this.response.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        this.response.end("NOTE WITH THIS TITLE ALREADY EXISTS. PLEASE USE DIFFERENT NOTE TITLE");
                    }                    
                } else {
                    this.response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    this.response.end("ERROR. INCORECT PASSWORD.");
                }
            }
        });

}
