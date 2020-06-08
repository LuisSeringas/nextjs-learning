const helloReqHandler = (req, res) => {
    res.status(200).json({ text: 'HelloWorld' });
};

export default helloReqHandler;
