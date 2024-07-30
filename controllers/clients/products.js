const Product = require('../../models/product');
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position :"desc"});
    const newProducts = products.map( item => {
        item.priceNew = (item.price *(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })
    res.render('client/pages/products/index',{
        pageTitle: "Trang Sản Phẩm",
        products : newProducts
    })
}

module.exports.detail = async (req, res) => {
    try {

        const find = {
            deleted:false,
            slug: req.params.slug,
            status: "active"
        }

        const product = await Product.findOne(find);
        res.render('client/pages/products/detail',{
            pageTitle:"Trang Chi tiết sản phẩm",
            product: product
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).flash("error","Đã xảy ra l��i khi tìm kiếm sản phẩm.");
        res.redirect(`/products`);
    }
  
}