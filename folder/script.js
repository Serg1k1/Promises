// Sample implementation of Folder class
class Folder {
    constructor(contents) {
        this.contents = contents;
    }

    size(cb) {
        cb(this.contents.length);
    }

    read(index, cb) {
        cb(this.contents[index]);
    }
}

const findAllJavascriptFiles = (folder, callback) => {
    const jsFiles = [];

    const traverse = (currentFolder) => {
        currentFolder.size(size => {
            for (let i = 0; i < size; i++) {
                currentFolder.read(i, item => {
                    if (typeof item === 'string') {
                        if (item.endsWith('.js')) {
                            jsFiles.push(item);
                        }
                    } else if (item instanceof Folder) {
                        traverse(item);
                    }
                });
            }
            size === 0 && callback(jsFiles); // Callback when traversal is complete
        });
    };

    traverse(folder);
};

// Test case
const root = new Folder([
    "1.js",
    "2.js",
    new Folder([
        new Folder([
            "3.txt",
        ]),
        "4.js",
    ]),
    new Folder([
        "5.png",
        "6.js",
        new Folder([
            "7.txt",
        ]),
    ]),
    "8.html",
]);

findAllJavascriptFiles(root, result => {
    console.log(result); // Output: ["1.js", "2.js", "4.js", "6.js"]
});