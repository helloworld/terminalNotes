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
}
