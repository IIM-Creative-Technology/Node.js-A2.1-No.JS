const mongoose = require("mongoose");
const { Schema } = mongoose;

// CONNECTION TO DATABASE _____________________________________________________________________________________________________________________________________________

var username = encodeURIComponent(process.env.MONGO_DB_ATLAS_LOGIN_USERNAME);
var password = encodeURIComponent(process.env.MONGO_DB_ATLAS_LOGIN_PASSWORD);
var link = `mongodb+srv://${username}:${password}@pixelchat.hfbyom1.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(link, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."));

// ADD COLLECTION TO DATABASE _____________________________________________________________________________________________________________________________________________

const USER = new Schema({
  FisrtName: String,
  LastName: String,
  Password: String,
  Pseudo: String,
});
const User = mongoose.model("User", USER);

const message = new Schema({
  author_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
  body: String,
  DateTime: Number,
});

const Message = mongoose.model("Message", message);

//FUNCTIONS _________________________________________________________________________________________________________________________________________________________________
// ADD USER TO DATABASE _______________________________________________________________________________________________________________________________________________________
/**
 *
 * @param {*} FisrtName Firstname de l'utilisateur à ajouter
 * @param {*} LastName Lastname de l'utilisateur à ajouter
 * @param {*} Password Password de l'utilisateur à ajouter
 * @param {*} Pseudo Pseudo de l'utilisateur à ajouter
 * @returns renvoie les datas de l'utilisateur ajouté
 */
function AddUserToDatabase(FisrtName, LastName, Password, Pseudo) {
  const NewUser = new User({
    FisrtName: FisrtName,
    LastName: LastName,
    Password: Password,
    Pseudo: Pseudo,
  });

  NewUser.save();
  return NewUser;
}

//AddUserToDatabase("prenbom de test final", "Nom de test final ", "mot de passe de test final ", "pseudo de test final");

//GET USER DATA By ID  ________________________________________________________________________________________________________________________________________________
/**
 *
 * @param {*} id Id de l'utilisateur à récupérer
 * @returns renvoie toutes les datas de l'utilisateur
 */
function GetDataUserById(id) {
  return User.findById(id, function (err, user) {
    if (err) {
      return err;
    } else {
      console.log(user);
      return user;
    }
  });
}
//GetDataUserById("63d63f5171a3e3ec4dced5aa");

// GET ALL USER _________________________________________________________________________________________________________________________________________________________________
/**
 *
 * @returns renvoie les datas de tous les utilisateurs
 */

function GetAllUser() {
  return User.find({}, function (err, user) {
    if (err) {
      return err;
    } else {
      
      return user;
    }
  });
}
GetAllUser();
// UPDATE USER DATA BY ID __________________________________________________________________________________________________________________________________________________________
/**
 *
 * @param {String} id id de l'utilisateur à modifier
 * @param {*} FisrtName noueau prénom de l'utilisateur
 * @param {*} LastName nouveau Lastname de l'utilisateur
 * @param {*} Password Nouveau mot de passe de l'utilisateur
 * @param {*} Pseudo nouveau pseudo de l'utilisateur
 * @returns  return les datas de l'utilisateur modifié
 */

function UpdateUserDataById(id, FisrtName, LastName, Password, Pseudo) {
  return User.updateOne(
    { _id: id },
    {
      FisrtName: FisrtName,
      LastName: LastName,
      Password: Password,
      Pseudo: Pseudo,
    },
    function (err, user) {
      if (err) {
        return err;
      } else {
        console.log(user);
        return user;
      }
    }
  );
}
//UpdateUserDataById("63d63f5171a3e3ec4dced5aa");

// DELETE USER BY ID _______________________________________________________________________________________________________________________________________________________________
/**
 *
 * @param {string} id Id de l'utilisateur à supprimer
 * @returns  renvoie les datas de l'utilisateur supprimé
 */

function DeleteUserById(id) {
  return User.deleteOne({ _id: id }, function (err, user) {
    if (err) {
      return err;
    } else {
      console.log(user);
      return user;
    }
  });
}
//DeleteUserById("63d63f5171a3e3ec4dced5aa");

// ADD MESSAGE TO DATABASE _______________________________________________________________________________________________________________________________________________________
/**
 *
 *
 * @param {String} author_id Id de la personne qui a envoyé le message
 * @param {String} body   Le Contenu du message
 * @returns renvoie le message ajouté
 */
function AddMessageToDatabase(author_id, body) {
  const NewMessage = new Message({
    author_id: author_id,
    body: body,
    DateTime: Date.now(),
  });
  NewMessage.save();
  console.log(NewMessage);
  return NewMessage;
}
//AddMessageToDatabase( "63d596d90ecf2910997ad3bc", "message de AZERTY");

//GET ALL  MESSAGE _________________________________________________________________________________________________________________________________________________________________

/**
 *
 * @param {Number} quantity combient de message on veux récupérer
 * @returns  renvoie le nombre de message demandé en commancant par le plus récent
 */

function GetAllMessage(quantity = undefined) {
  return Message.find(function (err, message) {
    if (quantity == undefined) {
      quantity = 100;
    }
    if (err) {
      return err;
    } else {
      console.log(message);
      return message;
    }
  })
    .limit(quantity)
    .sort({ DateTime: -1 });
}

// EXPOrt

// exportter toutes les fonctions
module.exports = {
  AddUserToDatabase,
  GetDataUserById,
  GetAllUser,
  UpdateUserDataById,
  DeleteUserById,
  AddMessageToDatabase,
  GetAllMessage,
};
