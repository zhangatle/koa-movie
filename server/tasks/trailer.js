const cp = require('child_process');
const {resolve } = require('path');

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

    const script = resolve(__dirname, '../crawler/video');
    const child = cp.fork(script, []);
    let invoked = false;

    child.on('error', err => {
        if (invoked) return;
        invoked = true;
        console.log(err);
    });

    child.on('exit', code => {
        if(invoked) return;
        invoked = true;
        let err = code === 0 ? null : new Error('exit code' + code);
        console.log(err);
    });

    child.on('message', async data => {
        console.log(data);
    })

    child.send(movies);
})();