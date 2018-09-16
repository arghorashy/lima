
var parser = require('./parser')
var evaluate = require('./evaluate')
var coreLevel1 = require('./coreLevel1')

// args - Should be process.argv.slice(2) from the entrypoint
module.exports = function(sourceString, args) {
    var moduleAst = parser.withState({index:0}).module().tryParse(sourceString)

    var coreLevel1Scope = coreLevel1.makeCoreLevel1Scope()

    var moduleContext = coreLevel1.limaObjectContext(coreLevel1Scope)
    evaluate.resolveObjectSpace(moduleContext, moduleAst.expressions, 0, undefined, true)

    var module = moduleContext.this
    // if(module.meta.public.main !== undefined) {
    //     var mainScope = coreConstructs.Scope(module.scope, {
    //       this: module
    //     })
    //     module.privileged.main(mainScope, [args])
    // }

    return module
}

