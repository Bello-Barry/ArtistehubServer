
import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = "mongodb+srv://bellobarry01:wg4BYPi8GiHoO7Hw@cluster1.4i9mjqy.mongodb.net/?retryWrites=true&w=majority";

  if (!connectionUrl) {
    throw new Error("DATABASE_URL is not defined");
  }

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Base de données de commerce électronique connectée avec succès !"))
    .catch((err) =>
      console.log(`Obtention d’une erreur de connexion à la base de données ${err.message}`)
    );
};

export default connectToDB;




 
 
 