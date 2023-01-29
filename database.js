// Imports

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Database Credentials
const username = encodeURIComponent(process.env.MONGO_DB_ATLAS_LOGIN_USERNAME);
const password = encodeURIComponent(process.env.MONGO_DB_ATLAS_LOGIN_PASSWORD);
const link = `mongodb+srv://${username}:${password}@pixelchat.hfbyom1.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(link, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to MongoDB.")
});


// Collections
const USER = new Schema({FisrtName: String, LastName: String, Password: String, Pseudo: String});
const User = mongoose.model("User", USER);

const MESSAGE = new Schema({author_id: [{ type: Schema.Types.ObjectId, ref: "User" }], body: String, DateTime: Number});
const Message = mongoose.model("Message", MESSAGE);

const PIXEL = new Schema({Pixeldatas: Array});
const Pixel = mongoose.model("Pixel", PIXEL);


// Fonctions GET

/**
 * Récupère tous les utilisateurs de la base de données
 * @param {Function} callback la fonction qui va recevoir les données
 * @returns renvoie les datas de tous les utilisateurs
 */
function GetAllUser(callback) {
  //returns all users in User
  User.find().sort({ _id: -1 }).exec(function (err, user) {
    callback(user);
  });
}

/**
 * Récupère les données d'un utilisateur par son id
 * @param {*} id Id de l'utilisateur à récupérer
 * @param callback la fonction qui va recevoir les données
 * @returns renvoie toutes les datas de l'utilisateur
 */
function GetDataUserById(id , callback) {
  User.findById(id, function (err, user) {
    if (err) {
      return err;
    } else {
      console.log(user);
      callback( user);
    }
  });
}

/**
 * Récupère tous les messages de la base de données
 * @param {Function} callback la fonction qui va recevoir les données
 * @param {Number} quantity combient de message on veux récupérer
 * @returns  renvoie le nombre de message demandé en commancant par le plus récent
 */
function GetAllMessage(callback, quantity = undefined) {
  if(quantity===undefined) quantity = 100;
  Message.find().limit(quantity).sort({ DateTime: -1 }).exec(function (err, message) {
    callback(message);
  });
}


// Fonctions POST

/**
 * Ajoute un utilisateur à la base de données
 * @param {Object} form contient toutes les données à ajouter dans une liste [FisrtName, LastName, Password, Pseudo]
 * @param callback la fonction qui va recevoir les données pour le retour
 * @returns renvoie les datas de l'utilisateur ajouté
 */
function AddUserToDatabase(form , callback) {
  console.log(form);
  const NewUser = new User({
    FisrtName: form.FisrtName,
    LastName: form.LastName,
    Password: form.Password,
    Pseudo: form.Pseudo,
  });
  NewUser.save().then(user => {
    callback(user);
  });
}

/**
 * Ajoute un message à la base de données
 * @param {String} form contient toutes les données à ajouter dans une liste [author_id, body]
 * @param callback la fonction qui va recevoir les données pour le retour
 * @returns renvoie le message ajouté
 */
function AddMessageToDatabase(form, callback){
  console.log(form)
  const NewMessage = new Message({
    author_id: form.author_id,
    body: form.body,
    DateTime: Date.now(),
  });
  NewMessage.save().then(r => {
    callback(r);
  });
}

// fonctions PUT

/**
 * Modifie les données d'un utilisateur par son id
 * @param {String} id id de l'utilisateur à modifier
 * @param {*} form contient toutes les données à modifier dans une liste [FisrtName, LastName, Password, Pseudo]
 * @param {Function} callback la fonction qui va recevoir les données pour le retour
 * @returns  return les datas de l'utilisateur modifié
 */
function UpdateUserDataById(id, form, callback) {
  return User.updateOne(
    { _id: id },
    {
      FisrtName: form.FisrtName,
      LastName: form.LastName,
      Password: form.Password,
      Pseudo: form.Pseudo,
    },
    function (err, status) {
      if (err) {
        return err;
      } else {
        callback(status);
      }
    }
  );
}

// Fonctions DELETE

/**
 * Supprime un utilisateur par son id
 * @param {string} id Id de l'utilisateur à supprimer
 * @param {Function} callback la fonction qui va recevoir les données pour le retour
 * @returns  renvoie les datas de l'utilisateur supprimé
 */
function DeleteUserById(id , callback ) {
  User.deleteOne({ _id: id }, function (err) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
}

module.exports = {
  AddUserToDatabase,
  GetDataUserById,
  GetAllUser,
  UpdateUserDataById,
  DeleteUserById,
  AddMessageToDatabase,
  GetAllMessage,
};