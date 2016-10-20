var Backbone = require('backbone');

var Contact = Backbone.Model.extend({

});

var ContactCollection = Backbone.Collection.extend({
   model: Contact,
   url: 'http://tiny-lasagna-server.herokuapp.com/collections/bear-contacts-2'
});


module.exports = {
   Contact: Contact,
   ContactCollection: ContactCollection
};
