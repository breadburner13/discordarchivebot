module.exports = {
    name: 'save',
    description: 'Saves file according to arguments',
    execute(message, args) {
        message.channel.send("hi");
        message.channel.send(`${args}`);
    }
}