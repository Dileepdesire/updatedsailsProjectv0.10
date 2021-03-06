/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

//	schema : true,

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	
    userId:{
      type:'integer',
      primaryKey:true
    },

    shopId:{
      model:'shop'
    },

*/
    
    provider: 'STRING',
    uid: 'STRING',
  //  name: 'STRING',
  //  email: 'STRING',
    firstname: 'STRING',
    lastname: 'STRING',


  	name:{
  		type: 'string',
  		//required: true
  	},

  	title: {
  		type: 'string'
  	},

  	email: {
  		type: 'string',
  	//	required: true,
  	//	email: true,
  	//	unique: true
  	},

    admin: {
      type: 'boolean',
      defaultsTo : false
    },

  	encryptedPassword: {
  		type: 'string'
  	},

   /* facebookId: {
      type: 'string',
      //required: true,
      unique: true
    }, */
    shop: {
      collection: 'shop',
      via: 'createdBy'
    },

    subscription: {
      collection: 'shop',
     // via: 'subscribeBy'
    },




    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    },
  	
  	//hide parameter to display in JSON
  	// toJSON: function(){
  	// 	var obj = this.toObject();
  	// 	delete obj.password;
  	// 	delete obj.confirmation;
  	// 	delete obj.encryptedPassword;
  	// 	delete obj._csrf;
  	// 	return obj;
  	// }
    
  

/*
  beforeValidation: function(values,next){
    console.log(values);
    if(typeof values.admin !== 'undefined'){
      if(values.admin === 'unchecked'){
        values.admin = false;
      }else if(values.admin[1] === 'on'){
        values.admin = true;
      }
    }
    next();
  },
*/




  beforeCreate: function(values,next){

    //This checks to make sure the password and password confirmation match before creating record
    if(!values.password || values.password != values.confirmation) {
      return next({err: ["Password doesn't match the password confirmation"]});

    }

    require('bcrypt').hash(values.password,10, function passwordEncrypted(err,encryptedPassword) {
      if(err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    }); 
  }

}

};
