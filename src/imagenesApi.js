var ImagenesApi = (function() {
    var ImagenesApi = function(models, imagenFactory, fs) {
        this.models = models;
        this.imagenFactory = imagenFactory;
        this.fs = fs.module;
    };
    
    ImagenesApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.imagen.find(function (err, imagenes) {
            if (err) return next(err);
            console.log(imagenes)
            res.json(imagenes);
        });
    };
    /*
    ImagenesApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.balance.findOne({ _id: req.params.id })
        .populate('_userId')
        .exec(function (err, balance) {
            if (err) return next(err);
            console.log(balance);
            res.json(balance);
        });
    };
    */
    ImagenesApi.prototype.save = function(req, res, next){
        var that = this;
        
        var imgPath = './public/images/logo.png';
        var imagen = that.imagenFactory.get();
        imagen.imagen.data = that.fs.readFileSync(imgPath);
        imagen.imagen.contentType = "png";

        imagen.save(function(err, imagen) {
            if(err){
                Object.keys(err.errors).forEach(function(key) {
                    var message = err.errors[key].message;
                    console.log('Validation error for "%s": %s', key, message);
                });
            }
            console.log("imagen guardada");
            res.json({data: "imagen guardada"});
        }); 
    };

    return ImagenesApi;
})();

module.exports = ImagenesApi;