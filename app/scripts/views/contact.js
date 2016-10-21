var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');


var ContactListView = Backbone.View.extend({
   tagName: 'ul',
   className: 'list-group col-sm-4 col-sm-offset-4',

   initialize: function(){
      this.listenTo(this.collection, 'add', this.renderContactItem);
   },

   render: function(){
      var formView =  new ContactFormView({'collection': this.collection});
      this.$el.prepend(formView.render().el);
      return this;
   },


   renderContactItem: function(contact) {
      var contactItem = new ContactItemView({model: contact});
      this.$el.append(contactItem.render().el);
   }
});


var ContactItemView = Backbone.View.extend({
   tagName: 'li',
   className: 'list-group-item contact-item',

   events: {
      'click .btn-danger': 'deleteContact'
   },

   template: _.template($('#contact-stamp').html()),

   render: function(){
      var context = this.model.toJSON();
      this.$el.html(this.template(context));
      return this;
   },

   deleteContact: function(){
      console.log('delete contact', this.model);
      this.model.destroy();
      this.$el.slideDown(function(){this.remove();});
   }


});

var ContactFormView = Backbone.View.extend({
   tagName: 'form',
   className: 'list-group-item',

   attributes: {
      id: 'contact-form'
   },


   template: _.template($('#form-stamp').html()),

   events: {
      'submit': 'addContact',
   },

   render: function() {
      this.$el.html(this.template());
      this.$el.find('.form-group').hide();
      return this;
   },



   addContact: function(event){
      event.preventDefault();

      if($('.form-group').is(':visible')){

         var name = $('#input-name').val();
         var email = $('#input-email').val();
         var phone = $('#input-phone').val();

         this.collection.create({
                                    'name':  name,
                                    'email': email,
                                    'phone': phone
                                 });

         $('#input-name').val('');
         $('#input-email').val('');
         $('#input-phone').val('');
         $('.form-group').hide();
      }
      else {
         $('.form-group').show();

      }
}


});









// singleton
// var formView = new ContactFormView();


module.exports = {
   ContactItemView: ContactItemView,
   ContactListView: ContactListView,
   ContactFormView: ContactFormView
};
