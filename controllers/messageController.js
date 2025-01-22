const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
    },
];

exports.getMessages = (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
}

exports.newMessageForm = (req, res) => {
    res.render("form", { title: "New Message" });
}

exports.addMessage = (req, res) => {
    const { messageUser, messageText } = req.body;  
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
}

exports.getMessageDetails = (req, res) => {
    const message = messages[req.params.id];
    if (message) {
        res.render("message", { title: "Message Details", message: message });  
    } else {
        res.status(404).send("Message not found");  
    }
};