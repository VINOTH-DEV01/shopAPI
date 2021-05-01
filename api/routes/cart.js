const express = require("express");
const router = express.Router();

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
          
                                                                                                                                                    
router.get('/', (req, res, next) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    // res.status(200).json({   
    //     message: "Welcome to Single Products page",
    //     productCount: 50,
    // });
    res.render("cart");
});

router.get('/single-product', (req, res, next) => {
    const products = {
        name: req.body.name,
        id: req.body.id
    } 
    console.log(products);
    res.status(200).json({
      message:" Handling POST request to /Prouducts page",
      createProduct: products
    });
    // const id = req.params.productId;
    // if (id === "special") {
    //     res.status(201).json([
    //         {
    //             id: 1,
    //             email: "george.bluth@reqres.in",
    //             first_name: "George",
    //             last_name: "Bluth",
    //             avatar: "https://reqres.in/img/faces/1-image.jpg"
    //         },
    //         {
    //             id: 2,
    //             email: "janet.weaver@reqres.in",
    //             first_name: "Janet",
    //             last_name: "Weaver",
    //             avatar: "https://reqres.in/img/faces/2-image.jpg"
    //         },
    //         {
    //             id: 3,
    //             email: "emma.wong@reqres.in",
    //             first_name: "Emma",
    //             last_name: "Wong",
    //             avatar: "https://reqres.in/img/faces/3-image.jpg"
    //         },
    //         {
    //             id: 4,
    //             email: "eve.holt@reqres.in",
    //             first_name: "Eve",
    //             last_name: "Holt",
    //             avatar: "https://reqres.in/img/faces/4-image.jpg"
    //         },
    //         {
    //             id: 5,
    //             email: "charles.morris@reqres.in",
    //             first_name: "Charles",
    //             last_name: "Morris",
    //             avatar: "https://reqres.in/img/faces/5-image.jpg"
    //         },
    //         {
    //             id: 6,
    //             email: "tracey.ramos@reqres.in",
    //             first_name: "Tracey",
    //             last_name: "Ramos",
    //             avatar: "https://reqres.in/img/faces/6-image.jpg"
    //         }
    //     ]);
    // }
    // else {
    //     res.status(201).json({
    //         message: "You passed an Id",
    //     });
    // }
});

module.exports = router;
   /*res.status(200).json({
       message: "Welcome to proudcts page",
       productCount: 50,
   });*/