const express = require('express');
const router = express.Router();
const dropServices = require('../../services/drop');

exports.newDrop = async(req, res, next) => {
    try {
        const drop = await dropServices.newDrop(req.body);
        res.json({
            msg:'드롭 생성 완료',
            data:drop
        });

    }catch(error) {
        next(error);
    }
}

exports.getDrops = async(req, res, next) => {
    try {
        const drops = await dropServices.getDrops();
        res.json({
            msg: '전체 드롭 조회 완료',
            data:drops
        })
    } catch(error) {
        next(error);
    }
}



// router.get('/', async (req, res) => {
//     try {
//         const drops = await Drop.findAll();
//         res.json({
//             msg:'전체 드롭 조회 완료',
//             data:drops
//         });
//     } catch(error) {
//         res.json({message:error});
//     }
// });

// router.post('/', async (req, res, next) => {
//     const {content, latitude, longitude} = req.body;
//     try {
//         console.log(content, latitude, longitude)
//         const drop = await Drop.create({
//             content,
//             latitude,
//             longitude
//         })
//         res.json({
//             msg:'드롭 생성 완료',
//             data:drop
//         })
//     } catch (error){
//         next(error);
//     }

//     }
    //구조 분해할당
    // try{
    //     await Drop.create({
    //         content:req.body.content,
    //         longitude:req.body.longitude,
    //         latitude:req.body.longitude,
    // })
    // } catch (error) {
    //     res.json({message:error})
    // }
// );

// module.exports = router;