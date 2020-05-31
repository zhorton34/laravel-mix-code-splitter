let fs = require('fs');
let mix = require('laravel-mix')

const str = (value = '') => require('laravel-js-str').Str.of(value);

const CollectFiles = (folder, files = []) => {
    const isFolder = to => new File(path.resolve(to)).isDirectory();
    const CombineFiles = (Files, Segments = []) => [ ...Files, path.join(Mix.paths.rootPath, Segments[0], '/', Segments[1])];

    return fs.readdirSync(folder).reduce((list, file, index, original) =>
            isFolder(`${folder}/${file}`)
                ? CollectFiles(`${folder}/${file}`, list)
                : CombineFiles(list, [folder, file]),
        files
    );
};

/**
 * Compile Each File In A Directory To It's Own File without needing to individually list each one off 
 */
class CodeSplit {
    /**
     * The optional name to be used when called by Mix.
     * Defaults to the class name.
     *
     * @return {String|Array}
     */
    name() {
        return ['split', 'codeSplit'];
    }

    /**
     * All dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        return ['laravel-js-str'];
    }

    /** Run The Split Command via a specific mix method **/
    register(via, folder, to, ...parameters) {
        CollectFiles(folder).map(file => str(file).afterLast(file, '/').toString())
            .filter(file => file !== null && typeof file !== "undefined")
            .forEach(
                file => typeof parameters === 'undefined'
                    ? via(path.resolve(Mix.paths.rootPath, `${folder}/${file}`), path.resolve(Mix.paths.rootPath, (`${to}/${file}`)))
                    : via(path.resolve(Mix.paths.rootPath, `${folder}/${file}`), path.resolve(Mix.paths.rootPath, (`${to}/${file}`)), ...parameters)
       );
    }
};


mix.extend('split', new CodeSplit());
