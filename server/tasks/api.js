const rp = require('request-promise-native');

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/${item.doubanId}`;
    const res = await rp(url);
    let body;

    try{
        body = JSON.parse(res);
    }catch (err) {
        console.log(err);
    }

    return body;
}

;(async () => {
   let movies = [
       { doubanId: 30358789,
           title: '潮间奇事',
           rate: 6.2,
           poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2540641704.jpg'
       },
       { doubanId: 27092648,
           title: '蒙上你的眼',
           rate: 6.9,
           poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2537908150.jpg'
       },
   ];

   for(let i = 0; i < movies.length; i++){
       let movie = movies[i];
       let movieData = await fetchMovie(movie);
       console.log(movieData);
   }
})();