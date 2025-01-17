const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    // Initialize Socket.IO with CORS configuration
    io = socketIo(server, {
        cors: {
            origin: "http://localhost:5173", // Adjust based on your frontend URL
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        // Listen for join event
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`User ${userId} joined with socket ID: ${socket.id}`);
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`Captain ${userId} joined with socket ID: ${socket.id}`);
                } else {
                    console.error(`Invalid userType: ${userType}`);
                }
            } catch (error) {
                console.error(`Error updating socketId for ${userId}:`, error.message);
            }
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log('Client disconnected', socket.id);

            try {
                // Clean up the socketId from the database (optional)
                await userModel.updateMany({ socketId: socket.id }, { $unset: { socketId: 1 } });
                await captainModel.updateMany({ socketId: socket.id }, { $unset: { socketId: 1 } });
                console.log(`Cleaned up socketId: ${socket.id}`);
            } catch (error) {
                console.error(`Error during disconnect cleanup for socketId: ${socket.id}`, error.message);
            }
        });
    });
}

// Function to send a message to a specific socket ID
function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
};
