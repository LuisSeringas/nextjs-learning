const previewDeployment = (req, res) => {
    res.status(200).json({
        text: 'This is a test to preview deployment for every push',
    });
};

export default previewDeployment;
