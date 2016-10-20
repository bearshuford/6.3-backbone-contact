var $ = require('jquery');
var views = require('./views/contact');
var models = require('./models/contact');

$(function(){

   var contactCollection = new models.ContactCollection();

   var contactForm = new views.ContactFormView({collection: contactCollection});
    contactForm.setElement($('#contact-form')[0]);



   var contactList = new views.ContactListView({collection: contactCollection});
   $('.app').append(contactList.render().el);

   contactCollection.fetch();

});
