const qiniu = require('qiniu');
const nanoid = require('nanoid');
const config = require('../config');

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
    let movies = [
        {
            video:'http://vt1.doubanio.com/201812251107/c9d393cae99022e57180cf67c503754f/view/movie/M/402400575.mp4',
            doubanId: 30358789,
            cover:'https://img3.doubanio.com/img/trailer/medium/2542351742.jpg'
        },
        {
            video:'http://vt1.doubanio.com/201812251107/2eccf20f4450dd22b996d3b50d6b7828/view/movie/M/402380362.mp4',
            doubanId: 27092648,
            cover:'https://img3.doubanio.com/img/trailer/medium/2537927012.jpg'
        }
    ];

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
            }catch (e) {
                console.log(e);
            }
        }
    }
})();