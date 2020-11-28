const fs = require('fs');
const path = require('path');

function dirTree(dir) {
   const notExcluded =  dir && !dir.includes('node_modules') && !dir.includes('.env') && !dir.includes('\.git') && !dir.includes('access.log')
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


const result = dirTree('./backEnd/');
result.content = result.content.filter(element => {
    return element != null;
});
const project = {
    title: "WMBackend Node Server",
    url: "https://github.com/waldo237/waldoMilanesAppBackEnd",
    description: "This is a NodeJs server that handles all the backend APIs for my personal website. It includes best practices such as proper error handling, rate limiters, proper encryption and hashing, etc.",
    screenshot: "https://firebasestorage.googleapis.com/v0/b/waldomilanes1.appspot.com/o/waldomilanesbackend.PNG?alt=media&token=441b7b8b-c644-461f-ba2e-0ee9b8b250fc",
    technology: "node",
    comments: [],
    date: "2020-05-27T18:59:03.483Z",
    rating: [],
    code: {
        dir: []
    }
}
project.code.dir.push(result);
fs.writeFileSync('./nano.json', JSON.stringify(project), 'utf8' );
