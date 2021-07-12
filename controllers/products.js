const products = {
    getProductsList: (req, res, next) => {
        res
        .status(200)
        .json({
            message: 'It is working!!'
        });
    },
    
}

module.exports = products;