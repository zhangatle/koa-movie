const qiniu = require('qiniu');
const nanoid = require('nanoid');
const config = require('../config');
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

const bucket = config.qiniu.bucket;
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
const cfg = new qiniu.conf.Config();
const client = new qiniu.rs.BucketManager(mac, cfg);

const uploadToQiniu = async (url, key) => {
    return new Promise((resolve, reject) => {
        client.fetch(url,bucket,key,(err, ret, info) => {
            if(err) {
                reject(err);
            } else {
                if(info.statusCode === 200) {
                    resolve({key});
                }else {
                    reject(info);
                }
            }
        })
    })
};

;(async () => {
    let movies = await Movie.find({
        $or: [
            {videoKey: {$exists: false}},
            {videoKey: null},
            {videoKey: ''}
        ]
    });

    for(let i = 0; i < movies.length; i++){
        let movie = movies[i];
        if(movie.video && !movie.videoKey){
            try {
               console.log('开始上传video');
               let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4');
               console.log('开始上传cover');
               let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg');
               console.log('开始上传poster');
               let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg');

               if(videoData.key){
                   movie.videoKey = videoData.key;
               }

               if(coverData.key){
                   movie.coverKey = coverData.key;
               }

               if(posterData.key) {
                   movie.posterKey = coverData.key;
               }

               console.log(movie);
               await movie.save();
            }catch (e) {
                console.log(e);
            }
        }
    }
})();