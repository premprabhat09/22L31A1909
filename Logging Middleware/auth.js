const axios = require('axios');
const fs = require('fs');
const path = require('path');

const authData = {
    "email": "premprabhathofficial@gmail.com",
    "name": "domada prem prabhath ahlad",
    "rollNo": "22l31a1909",
    "accessCode": "YzuJeU",
    "clientID": "7a83b193-77ba-44a5-8100-cf1b0094d31e",
    "clientSecret": "ndZUubMuPcrMrhsW"
};

const authenticate = async () => {
    try {
        const response = await axios.post('http://20.244.56.144/evaluation-service/auth', authData);
        const accessToken = response.data.access_token;

        if (accessToken) {
            console.log('Access Token:', accessToken);
            const configContent = `export const accessToken = "${accessToken}";\n`;
            const configPath = path.join(__dirname, 'config.js');
            fs.writeFileSync(configPath, configContent);
            console.log('Access token saved to config.js');
        } else {
            console.error('Could not retrieve access token.');
        }
    } catch (error) {
        console.error('Error during authentication:', error.response ? error.response.data : error.message);
    }
};

authenticate();