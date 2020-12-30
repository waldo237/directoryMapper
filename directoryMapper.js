const fs = require('fs');
const path = require('path');

function dirTree(dir) {
   
    const notExcluded =  
    dir && !dir.includes('node_modules') 
    && !dir.includes('.env') 
    && !dir.includes('\.git') 
    && !dir.includes('dist') 
    && !dir.includes('public')
    && !dir.includes('images')
    && !dir.includes('static')
    && !dir.includes('.cache')
    && !dir.includes('firebase')
    && !dir.includes('static')
    && !dir.includes('.png')
    && !dir.includes('.jpg')
    && !dir.includes('cache')


    if (notExcluded) {
        const stats = fs.lstatSync(dir);
        const info = { name: path.basename(dir) };

        if (stats.isDirectory()) {
            info.type = "dir";
            info.content = fs.readdirSync(dir).map(function (child) {
                const filepath = path.join(dir, child);
                return dirTree(filepath);
            });
        } else if (stats.isFile()) {
            info.type = "file";
            const result = fs.readFileSync(dir,'utf8')
          info.content = result

        }
        return info;
    }

    // if (module.parent == undefined) {
    //     // node dirTree.js ~/foo/bar
    //     const util = require('util');
    //     console.log(util.inspect(dirTree(process.argv[2]), false, null));
    // };
};


const result = dirTree('../Node Mailer');
result.content = result.content.filter(element => {
    return element != null;
});
const project = {
    title: "Real-Time Chat Application",
    url: "https://github.com/waldo237",
    description: "This is a node server that features a real-time chat app, it allows teammates to chat internnaly while they are connected to the we app https://teacheip.com/",
    screenshot: "https://firebasestorage.googleapis.com/v0/b/waldomilanes1.appspot.com/o/1_ovGD0BgtbRTncM4luzTNlQ.jpeg?alt=media&token=221a82b8-4553-4670-b789-82125224230a",
    technology: "node",
    comments: [],
    date: "2020-03-27T18:59:03.483Z",
    rating: [],
    code: {
        dir: []
    }
}
project.code.dir.push(result);
fs.writeFileSync('./nano.json', JSON.stringify(project), 'utf8' );
