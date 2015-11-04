var ImagenesApi = (function() {
    var ImagenesApi = function(models, imagenFactory, fs) {
        this.models = models;
        this.imagenFactory = imagenFactory;
        this.fs = fs.module;
    };
    //curl http://localhost:3000/imagenes/api/getAll
    ImagenesApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.imagen.find(function (err, imagenes) {
            if (err) return next(err);
            console.log(imagenes)
            res.json(imagenes);
        });
    };
    //curl http://localhost:3000/imagenes/api/oneImagen/563a52088ffd0f7317631896
    ImagenesApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.imagen.findOne({ _id: req.params.id })
        .exec(function (err, imagen) {
            if (err) return next(err);
            console.log(imagen);
            res.json(imagen);
        });
    };
    //curl -i -H "Content-Type: application/json" -d '{ "username": "rodrigo", "password": "test", "id": 1 }' http://localhost:3000/imagenes/api/post
    ImagenesApi.prototype.save = function(req, res, next){
        var that = this;
        
        var imgPath = './public/images/mapa.jpeg';
        var imagen = that.imagenFactory.get();
        imagen.imagen.data = that.fs.readFileSync(imgPath);
        //imagen.imagen.contentType = "png";

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