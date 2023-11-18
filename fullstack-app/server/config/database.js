const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        const uri = "mongodb+srv://kirycha21:P7H40l3B1foKqlik@cluster0.piqzstk.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(uri)
        .then(() => {
            console.log("Successfully connected to MongoDB!");
        })
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

module.exports = {
    connectToMongoDB,
};
